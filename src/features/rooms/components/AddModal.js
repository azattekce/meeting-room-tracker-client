// src/features/room/components/AddModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';
import RoomForm from './RoomForm';

const AddModal = ({ showAddModal, setShowAddModal, formik, loading }) => {
  return (
    <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Toplantı Odası Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RoomForm 
          formik={formik} 
          loading={loading} 
          submitText="Kaydet"
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;