import { useFormik } from 'formik';
import { useCallback } from 'react';

const createInitialValues = () => ({
  title: '',
  description: '',
  room_id: '',
  date: '',
  startTime: '',
  endTime: '',
  attendees: []
});

export const useMeetingsForm = (onAddSubmit, onEditSubmit) => {
  const addFormik = useFormik({
    initialValues: createInitialValues(),
    onSubmit: useCallback((values, formikBag) => {
      if (onAddSubmit) {
        onAddSubmit(values, formikBag);
      }
    }, [onAddSubmit])
  });

  const editFormik = useFormik({
    initialValues: createInitialValues(),
    enableReinitialize: true,
    onSubmit: useCallback((values, formikBag) => {
      if (onEditSubmit) {
        onEditSubmit(values, formikBag);
      }
    }, [onEditSubmit])
  });

  const resetForms = useCallback(() => {
    addFormik.resetForm();
    editFormik.resetForm();
  }, [addFormik, editFormik]);

  const isEditMode = (data) => !!(data && (data.meeting_id || data.id));

  return {
    addFormik,
    editFormik,
    isEditMode,
    resetForms
  };
};
