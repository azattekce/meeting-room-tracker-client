// src/features/user/pages/Users.jsx

import { useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../auth/hooks/useAuth';
import { useUserCrud } from '../hooks/useUserCrud';
import { useUserForm } from '../hooks/useUserForm';
import { useUserUI } from '../hooks/useUserUI';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import MyToastComponent from '../../common/MyToastComponent';

const Users = () => {
  const auth = useAuth();

  // CRUD işlemleri
  const { users, roles, loading, addUser, updateUser, deleteUser } = useUserCrud();

  // UI state (modal + toast kontrolü)
  const {
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    editingUser, setEditingUser,
    userToDelete, setUserToDelete,
    toast, setToast, showToast
  } = useUserUI();

  // Hata mesajını güvenli şekilde string'e çeviren fonksiyon
  const getErrorMessage = (err) => {
    if (typeof err === 'string') return err;
    if (err?.message) return err.message;
    if (err?.detail) return err.detail;
    if (err?.error) return err.error;
    if (typeof err === 'object') return JSON.stringify(err);
    return 'Hata oluştu!';
  };

  // Add User form - yeni modüler yapı
  const addForm = useUserForm(async (values, { resetForm }) => {
    try {
      await addUser(values);
      showToast('Kullanıcı başarıyla eklendi!', 'success');
      resetForm();
      setShowModal(false);
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
    }
  }); // ikinci parametre boş = add mode

  // Edit User form - yeni modüler yapı
  const editForm = useUserForm(async (values) => {
    try {
      await updateUser(editingUser.user_id, values);
      showToast('Kullanıcı güncellendi!', 'success');
      setShowEditModal(false);
      setEditingUser(null);
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
    }
  }, editingUser || {}); // ikinci parametre editingUser = edit mode

  // Delete confirm
  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete);
      showToast('Kullanıcı silindi!', 'success');
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  useEffect(() => {
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
        formik={addForm} // artık formik veriliyor
        roles={roles}
        loading={loading}
      />

      {/* Edit Modal */}
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        formik={editForm}
        roles={roles}
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
              <Card.Header className="bg-primary text-white">
                <strong>{user.firstname} {user.lastname}</strong>
              </Card.Header>

              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{user.username}</Card.Subtitle>
                <Card.Text>
                  <strong>Email:</strong> {user.email}<br />
                  <strong>GSM:</strong> {user.gsm}<br />
                  <strong>Rol:</strong> {user.role_type}
                </Card.Text>
              </Card.Body>

              {auth.getRoles()?.includes("0") && (
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                      setEditingUser(user);
                      setShowEditModal(true);
                    }}
                  >
                    Düzenle
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      setUserToDelete(user.user_id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Sil
                  </Button>
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
