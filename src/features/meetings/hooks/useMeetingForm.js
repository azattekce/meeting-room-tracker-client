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
    } else if (formData.startTime >= formData.endTime) {
      errors.endTime = 'End time must be after start time';
    }
    
    if (formData.attendees.length === 0) {
      errors.attendees = 'Please select at least one attendee';
    }
    
    return errors;
  };

  const resetForm = () => setFormData(getInitialFormData());

  

  return {
    formData, 
    setFormData,
    validationErrors, 
    setValidationErrors,
    validateForm, 
    resetForm
  };
};



