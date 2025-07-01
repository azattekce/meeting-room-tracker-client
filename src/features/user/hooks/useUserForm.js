// hooks/useUserForm.js
import { useState } from 'react';

const getInitialFormData = () => ({
  username: '', firstname: '', lastname: '', gsm: '', email: '', password: '', role_type: ''
});

export const useUserForm = () => {
  const [formData, setFormData] = useState(getInitialFormData());
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Kullanıcı adı zorunludur';
    if (!formData.firstname) errors.firstname = 'Ad zorunludur';
    if (!formData.lastname) errors.lastname = 'Soyad zorunludur';
    if (!formData.gsm) errors.gsm = 'GSM zorunludur';
    if (!formData.email) errors.email = 'E-posta zorunludur';
    if (!formData.role_type) errors.role_type = 'Yetki seçimi zorunludur';
    return errors;
  };

  const resetForm = () => setFormData(getInitialFormData());

  return {
    formData, setFormData,
    validationErrors, setValidationErrors,
    validateForm, resetForm
  };
};
