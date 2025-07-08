// src/features/room/components/EditModal.js
import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import RoomForm from './RoomForm';

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
        <RoomForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleEditSubmit}
          loading={loading}
        />  
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