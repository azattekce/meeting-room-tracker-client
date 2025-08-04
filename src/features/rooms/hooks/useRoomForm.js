import { useFormik } from 'formik';
import { useCallback } from 'react';
import { createRoomValidationSchema } from './validation/roomValidationSchema';
import { createInitialValues, processFormSubmission } from './utils/roomFormUtils';

export const useRoomForm = (onAddSubmit, onEditSubmit) => {
  // Add formik
  const addFormik = useFormik({
    initialValues: createInitialValues(),
    validationSchema: createRoomValidationSchema(),
    onSubmit: useCallback((values, formikBag) => {
      if (onAddSubmit) {
        console.log('Add form submit:', values);
        const processedValues = processFormSubmission(values);
        onAddSubmit(processedValues, formikBag);
      }
    }, [onAddSubmit]),
  });

  // Edit formik
  const editFormik = useFormik({
    initialValues: createInitialValues(),
    validationSchema: createRoomValidationSchema(),
    onSubmit: useCallback((values, formikBag) => {
      if (onEditSubmit) {
        console.log('Edit form submit:', values);
        const processedValues = processFormSubmission(values);
        onEditSubmit(processedValues, formikBag);
      }
    }, [onEditSubmit]),
    enableReinitialize: true,
  });

  const resetForms = useCallback(() => {
    addFormik.resetForm();
    editFormik.resetForm();
  }, [addFormik, editFormik]);

  const isEditMode = (data) => {
    return data && data.room_id;
  };

  return {
    addFormik,
    editFormik,
    isEditMode,
    resetForms,
  };
};
