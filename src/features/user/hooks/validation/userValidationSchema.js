// validation/userValidationSchema.js
import * as Yup from 'yup';

export const createUserValidationSchema = (isEdit = false) => {
  return Yup.object({
    username: Yup.string().required('Kullanıcı adı zorunludur'),
    firstname: Yup.string().required('Ad zorunludur'),
    lastname: Yup.string().required('Soyad zorunludur'),
    gsm: Yup.string().required('GSM zorunludur'),
    email: Yup.string().email('Geçerli e-posta girin').required('E-posta zorunludur'),
    // Password alanı gizli olarak gönderilecek, validation gerekmiyor
    password: Yup.string(),
    role_type: Yup.string().required('Yetki seçimi zorunludur'),
  });
};

export const userFieldLabels = {
  username: 'Kullanıcı Adı',
  firstname: 'Ad',
  lastname: 'Soyad',
  gsm: 'GSM',
  email: 'E-posta',
  password: 'Şifre',
  role_type: 'Yetki'
};
