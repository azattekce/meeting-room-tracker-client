import { useFormik } from 'formik';
import { createUserValidationSchema } from './validation/userValidationSchema';
import { createInitialValues, processFormSubmission, isEditMode } from './utils/userFormUtils';

export const useUserForm = (onSubmit, initialData = {}) => {
  const editMode = isEditMode(initialData);
  
  const formik = useFormik({
    initialValues: createInitialValues(initialData),
    validationSchema: createUserValidationSchema(editMode),
    onSubmit: (values, formikBag) => {
      const processedValues = processFormSubmission(values, editMode);
      onSubmit(processedValues, formikBag);
    },
    enableReinitialize: true,
  });

  return {
    ...formik,
    isEditMode: editMode,
  };
};

