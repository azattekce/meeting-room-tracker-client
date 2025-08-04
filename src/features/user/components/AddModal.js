import React from 'react';
import { Modal } from 'react-bootstrap';
import UserForm from './UserForm';

const AddModal = ({ showModal, setShowModal, formik, roles, loading }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Kullanıcı Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm 
          formik={formik} 
          roles={roles} 
          loading={loading} 
          submitText="Kaydet"
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
