import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, confirmDelete }) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton><Modal.Title>Kullanıcı Sil</Modal.Title></Modal.Header>
      <Modal.Body>Bu kullanıcıyı silmek istediğinizden emin misiniz?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>İptal</Button>
        <Button variant="danger" onClick={confirmDelete}>Sil</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
