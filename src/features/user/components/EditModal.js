import React from 'react';
import { Modal } from 'react-bootstrap';
import UserForm from './UserForm';

const EditModal = ({ showEditModal, setShowEditModal, formik, roles, loading }) => {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Kullanıcı Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm 
          formik={formik} 
          roles={roles} 
          loading={loading} 
          submitText="Güncelle"
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
