// utils/userFormUtils.js

export const createInitialValues = (initialData = {}) => ({
  username: initialData.username || '',
  firstname: initialData.firstname || '',
  lastname: initialData.lastname || '',
  gsm: initialData.gsm || '',
  email: initialData.email || '',
  password: initialData.password || '',
  role_type: initialData.role_type || '',
});

export const processFormSubmission = (values, isEdit = false) => {
  // Add modunda: password boş gönderilir
  // Edit modunda: mevcut password değeri gönderilir
  if (!isEdit) {
    // Add modunda password'ü boş yap
    return { ...values, password: '' };
  }
  // Edit modunda values'ı olduğu gibi gönder
  return values;
};

export const isEditMode = (initialData) => {
  return initialData && Object.keys(initialData).length > 0 && initialData.user_id;
};
