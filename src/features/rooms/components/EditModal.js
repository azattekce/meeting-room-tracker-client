// src/features/room/components/EditModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';
import RoomForm from './RoomForm';

const EditModal = ({ showEditModal, setShowEditModal, formik, loading }) => {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Odayı Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RoomForm 
          formik={formik} 
          loading={loading} 
          submitText="Güncelle"
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;