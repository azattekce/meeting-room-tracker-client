// src/features/rooms/pages/Rooms.js
import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Card, Alert, Spinner, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import MyToastComponent from '../../common/MyToastComponent';
import { useRoomCrud } from '../hooks/useRoomCrud';
import { useRoomUI } from '../hooks/useRoomUI';
import { useRoomForm } from '../hooks/useRoomForm';

const Rooms = () => {
  // Hooks
  const { rooms, loading, error, loadRooms, addRoom, updateRoom, deleteRoom } = useRoomCrud();
  const {
    showAddModal,
    showEditModal,
    showDeleteModal,
    showToast,
    toastMessage,
    toastVariant,
    selectedItem,
    setShowAddModal,
    setShowEditModal, 
    setShowDeleteModal,
    setSelectedItem,
    closeToast,
    showToastFunction
  } = useRoomUI();

  // Form submit işlemleri tanımla
  const handleAddSubmit = useCallback(async (values) => {
    try {
      await addRoom(values);
      showToastFunction('Oda başarıyla eklendi!', 'success');
      setShowAddModal(false);
    } catch (error) {
      console.error('Oda ekleme hatası:', error);
      showToastFunction('Oda eklenemedi!', 'danger');
    }
  }, [addRoom, showToastFunction, setShowAddModal]);

  const handleEditSubmit = useCallback(async (values) => {
    try {
      // room_id kullanarak güncelleme yap
      const roomId = selectedItem?.room_id;
      await updateRoom(roomId, values);
      showToastFunction('Oda başarıyla güncellendi!', 'success');
      setShowEditModal(false);
    } catch (error) {
      console.error('Oda güncelleme hatası:', error);
      showToastFunction('Oda güncellenemedi!', 'danger');
    }
  }, [updateRoom, selectedItem?.room_id, showToastFunction, setShowEditModal]);

  // useRoomForm hook'u
  const { 
    addFormik, 
    editFormik, 
    isEditMode, 
    resetForms 
  } = useRoomForm(handleAddSubmit, handleEditSubmit);

  // Sayfa yüklendiğinde odaları getir
  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  // Debug için data yapısını kontrol edelim
  useEffect(() => {
    console.log('Rooms data:', rooms);
    if (rooms && rooms.length > 0) {
      console.log('First room:', rooms[0]);
    }
  }, [rooms]);

  // Modal açma işlemleri
  const handleAdd = () => {
    console.log('handleAdd called, showAddModal before:', showAddModal);
    resetForms();
    setShowAddModal(true);
    console.log('handleAdd executed, setShowAddModal(true) called');
  };

  const handleEdit = (room) => {
    resetForms();
    // Backend'den gelen field isimlerine göre mapping - eski yapı
    editFormik.setFieldValue('room_name', room.room_name || '');
    editFormik.setFieldValue('location', room.location || '');
    editFormik.setFieldValue('capacity', room.capacity || '');
    editFormik.setFieldValue('room_type', room.room_type || '');
    editFormik.setFieldValue('created_by', room.created_by || 0);
    setSelectedItem(room); // Edit için room bilgisini sakla
    setShowEditModal(true);
  };

  const handleDelete = (room) => {
    setShowDeleteModal(true, room);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRoom(selectedItem.room_id);
      showToastFunction('Oda başarıyla silindi!', 'success');
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Oda silme hatası:', error);
      showToastFunction('Oda silinemedi!', 'danger');
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Oda Yönetimi</h2>
            <Button variant="primary" onClick={handleAdd}>
              <FaPlus className="me-2" />
              Yeni Oda Ekle
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Yükleniyor...</span>
              </Spinner>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {rooms && rooms.length > 0 ? (
                rooms.map((room) => (
                  <Col key={room.room_id}>
                    <Card className="h-100 shadow-sm border-primary">
                      <Card.Header className="bg-primary text-white">
                        <strong>{room.room_name}</strong>
                      </Card.Header>

                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">{room.room_type}</Card.Subtitle>
                        <Card.Text>
                          <strong>Konum:</strong> {room.location}<br />
                          <strong>Kapasite:</strong> {room.capacity} kişi<br />
                          <strong>Oda Tipi:</strong> {room.room_type}
                        </Card.Text>
                      </Card.Body>

                      <Card.Footer className="d-flex justify-content-between">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleEdit(room)}
                        >
                          <FaEdit className="me-1" />
                          Düzenle
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(room)}
                        >
                          <FaTrash className="me-1" />
                          Sil
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-center">Henüz oda bulunmamaktadır.</p>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>

      {/* Modals */}
      <AddModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        formik={addFormik}
        loading={loading}
      />

      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        formik={editFormik}
        loading={loading}
      />

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onDelete={handleDeleteConfirm}
        itemName={selectedItem?.room_name}
        loading={loading}
      />

      {/* Toast Notification */}
      <MyToastComponent
        show={showToast}
        onClose={closeToast}
        message={toastMessage}
        variant={toastVariant}
      />
    </Container>
  );
};

export default Rooms;