// src/features/user/pages/Users.jsx

import { useEffect } from 'react';
import { Button} from 'react-bootstrap';
import { useAuth } from '../../auth/hooks/useAuth';
import { useUserHandlers } from '../hooks/useUserHandlers';
import { Row, Col, Card } from 'react-bootstrap';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import MyToastComponent from '../../common/MyToastComponent';

const Users = () => {
  const auth = useAuth();
  const {
    users, roles,
    formData, setFormData,
    validationErrors,
    toast, setToast,
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    loading,
    editingUser, userToDelete,
    handleSubmit, handleEditSubmit,
    handleEdit, handleDelete, confirmDelete
  } = useUserHandlers();

  useEffect(() => {
    // auth içindeki yetkileri göstermek veya başka işlemler için kullanılabilir
    console.log('Auth roles:', auth.getRoles());
  }, [auth]);

  return (
    <div>
      <h2>Kullanıcılar</h2>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          +
        </Button>
      </div>
      
      {/* Toast */}
     <MyToastComponent toast={toast} setToast={setToast} />

      {/* Add Modal */}
     <AddModal
       showModal={showModal}
       setShowModal={setShowModal}
       formData={formData}
       roles={roles}
       validationErrors={validationErrors}
       setFormData={setFormData}
       handleSubmit={handleSubmit}
       loading={loading}
     />

      {/* Edit Modal */}
     <EditModal
       showEditModal={showEditModal}
       setShowEditModal={setShowEditModal}
       formData={formData}
       roles={roles}
       validationErrors={validationErrors}
       setFormData={setFormData}
       handleEditSubmit={handleEditSubmit}
       loading={loading}
     />

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        userToDelete={userToDelete}
        confirmDelete={confirmDelete}
      />

{/* Kullanıcı Kartları */}

<Row xs={1} md={2} lg={3} className="g-4">
  {users.map(user => (
    <Col key={user.user_id}>
      <Card className="h-100 shadow-sm border-primary">
        {/* Card Header */}
        <Card.Header className="bg-primary text-white">
          <strong>{user.firstname} {user.lastname}</strong>
        </Card.Header>

        {/* Card Body */}
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
          <Card.Text>
            <strong>Email:</strong> {user.email}<br />
            <strong>GSM:</strong> {user.gsm}<br />
            <strong>Rol:</strong> {user.role_type}
          </Card.Text>
        </Card.Body>

        {/* Card Footer */}
        {auth.getRoles()?.includes("0") && (
          <Card.Footer className="d-flex justify-content-between">
            <Button size="sm" variant="outline-primary" onClick={() => handleEdit(user)}>Düzenle</Button>
            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(user.user_id)}>Sil</Button>
          </Card.Footer>
        )}
      </Card>
    </Col>
  ))}
</Row>
    </div>
  );
};

export default Users;
