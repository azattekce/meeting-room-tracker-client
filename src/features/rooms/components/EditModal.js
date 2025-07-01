// src/features/room/components/EditModal.js
import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const EditModal = ({ 
  showEditModal, 
  setShowEditModal, 
  formData, 
  setFormData, 
  handleEditSubmit, 
  loading 
}) => {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Odayı Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Oda Adı</Form.Label>
            <Form.Control
              type="text"
              value={formData.room_name}
              onChange={(e) => setFormData({ ...formData, room_name: e.target.value })}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>Konum</Form.Label>
            <Form.Control
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>Kapasite</Form.Label>
            <Form.Control
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>Oda Tipi</Form.Label>
            <Form.Select
              value={formData.room_type}
              onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
              required
            >
              <option value="Küçük Toplantı Odası">Küçük Toplantı Odası</option>
              <option value="Konferans Salonu">Konferans Salonu</option>
              <option value="Eğitim Salonu">Eğitim Salonu</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>Oluşturan Kullanıcı ID</Form.Label>
            <Form.Control
              type="number"
              value={formData.created_by}
              onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)} disabled={loading}>
          İptal
        </Button>
        <Button variant="success" onClick={handleEditSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Güncelleniyor...
            </>
          ) : (
            "Güncelle"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;