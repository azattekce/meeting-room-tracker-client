// utils/roomFormUtils.js

export const createInitialValues = (initialData = {}) => ({
  room_name: initialData.room_name || '',
  location: initialData.location || '',
  created_by: initialData.created_by || 0,
  capacity: initialData.capacity || '',
  room_type: initialData.room_type || '',
});

export const processFormSubmission = (values) => {
  return {
    ...values,
    capacity: parseInt(values.capacity) || 0,
    created_by: parseInt(values.created_by) || 0
  };
};

export const isEditMode = (initialData) => {
  return initialData && initialData.room_id;
};
