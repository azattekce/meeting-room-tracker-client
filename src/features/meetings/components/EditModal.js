import React, { useEffect } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MeetingForm from './MeetingForm';
import { useMeetingForm } from '../hooks/useMeetingForm';

const EditModal = ({ show, handleClose, meeting, rooms, users, onUpdateMeeting }) => {
  // Getting the loading and error states from your actual meetings state
  const meetings = useSelector((state) => state.meetings || {});
  const loading = meetings.loading || false;
  const error = meetings.error || null;
  
  const {
    formData,
    setFormData,
    validationErrors,
    validateForm,
    updateFormData
  } = useMeetingForm();
  
  useEffect(() => {
    if (meeting && show) {
      updateFormData(meeting);
    }
  }, [meeting, show]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const meetingData = {
        ...formData,
        startTime: `${formData.date}T${formData.startTime}`,
        endTime: `${formData.date}T${formData.endTime}`,
      };
      
      // Use the onUpdateMeeting prop function passed from parent
      if (onUpdateMeeting) {
        onUpdateMeeting(meetingData);
      }
      
      handleClose();
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Toplantı Güncelleme</Modal.Title>
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

export default EditModal;