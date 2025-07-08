// src/features/rooms/pages/Rooms.js

import { useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../auth/hooks/useAuth';
import { useRoomsHandlers } from '../hooks/useRoomsHandlers';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import MyToastComponent from '../../common/MyToastComponent';

const Rooms = () => {
  const auth = useAuth();
  const {
    rooms, // Default değer
    formData, 
    setFormData,
    validationErrors,
    toast, 
    setToast,
    showModal, 
    setShowModal,
    showEditModal, 
    setShowEditModal,
    showDeleteModal, 
    setShowDeleteModal,
    loading,
    editingRoom, 
    roomToDelete,
    handleSubmit, 
    handleEditSubmit,
    handleEdit, 
    handleDelete, 
    confirmDelete
  } = useRoomsHandlers();

  useEffect(() => {
    // auth içindeki yetkileri göstermek veya başka işlemler için kullanılabilir
    console.log('Auth roles:', auth.getRoles());
  }, [auth]);

  return (
    <div>
      <h2>Toplantı Odaları</h2>
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
        formData={formData || {}} // Default boş obje
        validationErrors={validationErrors } // Default boş obje
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      {/* Edit Modal */}
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        formData={formData || {}} // Default boş obje
        validationErrors={validationErrors || {}} // Default boş obje
        setFormData={setFormData}
        handleEditSubmit={handleEditSubmit}
        loading={loading}
      />

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        roomToDelete={roomToDelete}
        confirmDelete={confirmDelete}
      />

      {/* Oda Kartları */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {rooms && rooms.length > 0 ? rooms.map(room => (
          <Col key={room.room_id}>
            <Card className="h-100 shadow-sm border-primary">
              {/* Card Header */}
              <Card.Header className="bg-primary text-white">
                <strong>{room.room_name}</strong>
              </Card.Header>

              {/* Card Body */}
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{room.room_type}</Card.Subtitle>
                <Card.Text>
                  <strong>Konum:</strong> {room.location}<br />
                  <strong>Kapasite:</strong> {room.capacity} kişi<br />
                  <strong>Oda Tipi:</strong> {room.room_type}
                </Card.Text>
              </Card.Body>

              {/* Card Footer */}
              {auth.getRoles()?.includes("0") && (
                <Card.Footer className="d-flex justify-content-between">
                  <Button size="sm" variant="outline-primary" onClick={() => handleEdit(room)}>Düzenle</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(room.room_id)}>Sil</Button>
                </Card.Footer>
              )}
            </Card>
          </Col>
        )) : (
          <Col>
            <p>Henüz oda bulunmamaktadır.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Rooms;