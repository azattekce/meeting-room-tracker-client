// src/features/room/components/DeleteModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ 
  showDeleteModal, 
  setShowDeleteModal, 
  confirmDelete 
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Onay Gerekiyor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bu odayı silmek istediğinize emin misiniz?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          İptal
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Evet, Sil
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;