// src/features/room/pages/Rooms.js
import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useRooms } from '../hooks/useRooms';
import { useRoomHandlers } from '../hooks/useRoomHandlers';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import RoomCard from '../components/RoomCard';
import MyToastComponent from '../../common/MyToastComponent';

const Rooms = () => {
  const auth = useAuth();
  const { rooms, loading } = useRooms();
  const {
    formData, setFormData,
    toast, setToast,
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    editingRoom, roomToDelete,
    handleSubmit, handleEdit, handleEditSubmit,
    handleDelete, confirmDelete
  } = useRoomHandlers();

  const isAdmin =1;// auth.user && auth.user.role_type === 1;

  if (loading && rooms.length === 0) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Toplantı Odaları</h2>
      
      {/* Toast component for notifications */}
      <MyToastComponent toast={toast} setToast={setToast} />
      
      {/* Add room button (only for admins) */}
      {isAdmin && (
        <div className="d-flex justify-content-left mb-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            +
          </Button>
        </div>
      )}
      
      {/* Room cards */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {rooms.map((room) => (
          <Col key={room.room_id}>
            <RoomCard 
              room={room} 
              handleEdit={handleEdit} 
              handleDelete={handleDelete}
              canEdit={isAdmin}
            />
          </Col>
        ))}
      </Row>
      
      {/* Modals */}
      <AddModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        formData={formData}
        setFormData={setFormData}
        handleEditSubmit={handleEditSubmit}
        loading={loading}
      />
      
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default Rooms;