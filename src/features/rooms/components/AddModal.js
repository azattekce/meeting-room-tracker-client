// src/features/room/components/AddModal.js
import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import RoomForm from './RoomForm';

const AddModal = ({ 
  showModal, 
  setShowModal, 
  formData, 
  setFormData, 
  handleSubmit, 
  loading,
  validationErrors 
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Toplantı Odası Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RoomForm
          formData={formData}
          setFormData={setFormData}
          validationErrors={validationErrors}
          onSubmit={handleSubmit}
          loading={loading}
        />
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