import React, { useEffect } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MeetingForm from './MeetingForm';
import { useMeetingForm } from '../hooks/useMeetingForm';

const AddModal = ({ show, handleClose, rooms, users, onAddMeeting }) => {
  // Getting the loading and error states from your actual meetings state

  console.log("Rooms:", rooms);
  console.log("Users:", users);

  const meetings = useSelector((state) => state.meetings || {});
  const loading = meetings.loading || false;
  const error = meetings.error || null;
  

  const {
    formData,
    setFormData,
    validationErrors,
    validateForm,
    resetForm
  } = useMeetingForm();
  
  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (validateForm()) {
      alert("Form is valid");
      const meetingData = {
        ...formData,
        startTime: `${formData.date}T${formData.startTime}`,
        endTime: `${formData.date}T${formData.endTime}`,
      };
      console.log("onAddMeeting:", onAddMeeting);
      
      // Use the onAddMeeting prop function passed from parent
      if (onAddMeeting) {
        console.log("Adding meeting with data:", meetingData);
        alert("Adding meeting with data: " + JSON.stringify(meetingData, null, 2));

        onAddMeeting(meetingData);
      }
      
      handleClose();
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Toplantı Tanımı</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <MeetingForm
          formData={formData}
          setFormData={setFormData}
          rooms={rooms}
          users={users}
          validationErrors={validationErrors}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;