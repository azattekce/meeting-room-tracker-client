import React from 'react';
import { Modal } from 'react-bootstrap';
import UserForm from '../components/UserForm';

const AddModal = ({ showModal, setShowModal, formData, roles, validationErrors, setFormData, handleSubmit, loading }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton><Modal.Title>Yeni Kullanıcı Ekle</Modal.Title></Modal.Header>
      <Modal.Body>
        <UserForm
          formData={formData}
          roles={roles}
          validationErrors={validationErrors}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
