import React from 'react';
import { Modal } from 'react-bootstrap';
import UserForm from '../components/UserForm';

const EditModal = ({ showEditModal, setShowEditModal, formData, roles, validationErrors, setFormData, handleEditSubmit, loading }) => {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton><Modal.Title>Kullanıcı Düzenle</Modal.Title></Modal.Header>
      <Modal.Body>
        <UserForm
          formData={formData}
          roles={roles}
          validationErrors={validationErrors}
          setFormData={setFormData}
          onSubmit={handleEditSubmit}
          loading={loading}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
