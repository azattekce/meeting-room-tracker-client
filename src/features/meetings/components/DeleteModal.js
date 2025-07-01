// src/features/meetings/components/DeleteModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDelete
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Toplantıyı İptal Et</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bu toplantıyı iptal etmek istediğinizden emin misiniz?</p>
        <p>Bu işlem geri alınamaz ve tüm katılımcılar bilgilendirilecektir.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Vazgeç
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Toplantıyı İptal Et
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;