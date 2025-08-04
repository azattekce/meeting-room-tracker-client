// src/features/rooms/components/DeleteModal.js
import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const DeleteModal = ({ 
  showDeleteModal, 
  setShowDeleteModal, 
  onDelete,
  itemName,
  loading
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Odayı Sil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>{itemName}</strong> odasını silmek istediğinizden emin misiniz?
          Bu işlem geri alınamaz.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={loading}>
          İptal
        </Button>
        <Button variant="danger" onClick={onDelete} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Siliniyor...
            </>
          ) : (
            "Sil"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;