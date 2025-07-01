// src/features/room/components/AddModal.js
import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const AddModal = ({ 
  showModal, 
  setShowModal, 
  formData, 
  setFormData, 
  handleSubmit, 
  loading 
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Toplantı Odası Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Oda Adı</Form.Label>
            <Form.Control
              type="text"
              placeholder="Oda Adı"
              value={formData.room_name}
              onChange={(e) => setFormData({ ...formData, room_name: e.target.value })}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>Konum</Form.Label>
            <Form.Control
              type="text"
              placeholder="Konum (Bina/Kat)"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>Kapasite</Form.Label>
            <Form.Control
              type="number"
              placeholder="Kapasite"
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
              <option value="">Oda Tipi Seç</option>
              <option value="Küçük Toplantı Odası">Küçük Toplantı Odası</option>
              <option value="Konferans Salonu">Konferans Salonu</option>
              <option value="Eğitim Salonu">Eğitim Salonu</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>Oluşturan Kullanıcı ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Oluşturan Kullanıcı ID"
              value={formData.created_by}
              onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
          İptal
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Kaydediliyor...
            </>
          ) : (
            "Kaydet"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;