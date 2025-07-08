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
    alert("handleSubmit called with formData: " + JSON.stringify(formData, null, 2));
    
    // Structure the meeting data from form data
    const meetingData = {
      meeting_id: meeting?.meeting_id || meeting?.id, // meeting prop'undan al
      title: formData.title,
      startTime: formData.startTime,
      endTime: formData.endTime,
      room_id: parseInt(formData.room_id),
      date: formData.date,
      description: formData.description,
      attendees: formData.attendees || []
    };
    
    if (validateForm()) {
      // Use the onUpdateMeeting prop function passed from parent
      alert("onUpdateMeeting called with meetingData: " + JSON.stringify(meetingData, null, 2));
      onUpdateMeeting(parseInt(meetingData.meeting_id), meetingData);
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