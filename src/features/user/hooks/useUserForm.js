import { useFormik } from 'formik';
import * as Yup from 'yup';


 export const useUserForm = (onSubmit, initialData = {}, isEdit = false) => {
  const formik = useFormik({
    initialValues: {
      username: initialData.username || '',
      firstname: initialData.firstname || '',
      lastname: initialData.lastname || '',
      gsm: initialData.gsm || '',
      email: initialData.email || '',
      password: initialData.password || '',
      role_type: initialData.role_type || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Kullanıcı adı zorunludur'),
      firstname: Yup.string().required('Ad zorunludur'),
      lastname: Yup.string().required('Soyad zorunludur'),
      gsm: Yup.string().required('GSM zorunludur'),
      email: Yup.string().email('Geçerli e-posta girin').required('E-posta zorunludur'),
      password: isEdit 
        ? Yup.string() // Edit modunda şifre opsiyonel
        : "", // Add modunda şifre zorunlu
      role_type: Yup.string().required('Yetki seçimi zorunludur'),
    }),
    onSubmit: (values, formikBag) => {
      // Edit modunda boş şifre varsa, şifreyi gönderme
      if (isEdit && !values.password) {
        const { password, ...valuesWithoutPassword } = values;
        onSubmit(valuesWithoutPassword, formikBag);
      } else {
        onSubmit(values, formikBag);
      }
    },
    enableReinitialize: true,
  });

  return formik;
};

