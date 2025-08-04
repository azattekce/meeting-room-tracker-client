// validation/roomValidationSchema.js
import * as Yup from 'yup';

export const createRoomValidationSchema = () => {
  return Yup.object({
    room_name: Yup.string().required('Oda adı zorunludur'),
    location: Yup.string().required('Konum zorunludur'),
    capacity: Yup.number()
      .required('Kapasite zorunludur')
      .positive('Kapasite pozitif bir sayı olmalıdır')
      .integer('Kapasite tam sayı olmalıdır')
      .max(1000, 'Kapasite 1000\'den fazla olamaz'),
    room_type: Yup.string().required('Oda tipi seçimi zorunludur'),
  });
};

export const roomFieldLabels = {
  room_name: 'Oda Adı',
  location: 'Konum',
  capacity: 'Kapasite',
  room_type: 'Oda Tipi'
};
