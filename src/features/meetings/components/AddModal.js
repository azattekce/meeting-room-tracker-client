import React from 'react';
import { Modal } from 'react-bootstrap';
import MeetingForm from './MeetingForm';

const AddModal = ({ showModal, setShowModal, formData, rooms, users, validationErrors, setFormData, handleSubmit, loading }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Toplantı Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MeetingForm
          formData={formData}
          rooms={rooms}
          users={users}
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