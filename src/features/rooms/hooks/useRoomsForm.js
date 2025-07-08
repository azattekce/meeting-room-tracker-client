// hooks/useRoomsForm.js
import { useState } from 'react';

const getInitialFormData = () => ({
  room_name: '',   
  location: '', 
  created_by: 0,
  capacity: 0,
  room_type: ''
});

export const useRoomsForm = () => {
  const [formData, setFormData] = useState(getInitialFormData());
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.room_name) errors.room_name = 'Oda adı zorunludur';
    if (!formData.location) errors.location = 'Konum zorunludur';
    if (!formData.capacity) {
      errors.capacity = 'Kapasite zorunludur';
    } else if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
      errors.capacity = 'Kapasite geçerli bir pozitif sayı olmalıdır';
    } else if (parseInt(formData.capacity) > 1000) {
      errors.capacity = 'Kapasite 1000\'den fazla olamaz';
    }
    if (!formData.room_type) errors.room_type = 'Oda tipi seçimi zorunludur';
    
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