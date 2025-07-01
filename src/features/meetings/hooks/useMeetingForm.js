import { useState } from 'react';
import moment from 'moment';

const getInitialFormData = () => ({
  title: '',
  description: '',
  room_id: '',
  date: moment().format('YYYY-MM-DD'),
  startTime: '',
  endTime: '',
  attendees: []
});

export const useMeetingForm = (initialData = null) => {
  const [formData, setFormData] = useState(initialData || getInitialFormData());
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.room_id) {
      errors.room_id = 'Please select a room';
    }
    
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    
    if (!formData.startTime) {
      errors.startTime = 'Start time is required';
    }
    
    if (!formData.endTime) {
      errors.endTime = 'End time is required';
    } else if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      errors.endTime = 'End time must be after start time';
    }
    
    if (formData.attendees.length === 0) {
      errors.attendees = 'Please select at least one attendee';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => setFormData(getInitialFormData());

  const updateFormData = (meeting) => {
    if (meeting) {
      const startMoment = moment(meeting.startTime);
      const endMoment = moment(meeting.endTime);
      console.log('Updating form data with meeting:', meeting);
      console.log('Start Moment:', startMoment.format('YYYY-MM-DD HH:mm')); 
      console.log('End Moment:', endMoment.format('YYYY-MM-DD HH:mm'));
      console.log('Attendees:', meeting.attendees);
      console.log('Meeting ID:', meeting.id);
      console.log('Meeting Title:', meeting.title);
      console.log('Meeting Description:', meeting.description);
      console.log('Room ID:', meeting.room_id);

      
      setFormData({
        id: meeting.id,
        title: meeting.title || '',
        description: meeting.description || '',
        roomId: meeting.room_id || '',
        date: startMoment.format('YYYY-MM-DD'),
        startTime: startMoment.format('HH:mm'),
        endTime: endMoment.format('HH:mm'),
        attendees: meeting.attendees ? meeting.attendees.map(a => a.id) : []
      });
      
      setValidationErrors({});
    }
  };

  return {
    formData, 
    setFormData,
    validationErrors, 
    setValidationErrors,
    validateForm, 
    resetForm,
    updateFormData
  };
};