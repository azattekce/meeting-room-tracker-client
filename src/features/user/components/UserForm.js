// UserForm.jsx
import React from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';

const UserForm = ({ formik, roles, loading, submitText = "Kaydet" }) => {
  // Edit modunu kontrol et
  const isEditMode = formik.isEditMode;
  
  // Şifre alanı hiçbir modda gösterilmez
  const fieldsToShow = ['username', 'firstname', 'lastname', 'gsm', 'email'];

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* Gizli şifre alanı - kullanıcıya gösterilmez ama form'da bulunur */}
      <input type="hidden" name="password" value={formik.values.password} />
      
      {fieldsToShow.map(field => (
        <Form.Group className="mb-3" key={field}>
          <Form.Control
            type={field === 'email' ? 'email' : 'text'}
            placeholder={field === 'gsm' ? 'GSM' : field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={formik.values[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched[field] && formik.errors[field]}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors[field]}
          </Form.Control.Feedback>
        </Form.Group>
      ))}

      {/* Şifre bilgi mesajı */}
      <div className="alert alert-info mb-3">
        <small>
          <i className="fas fa-info-circle me-2"></i>
          {isEditMode 
            ? "Kullanıcının mevcut şifresi korunacaktır."
            : "Şifre otomatik oluşturulacak ve e-posta adresine gönderilecektir."
          }
        </small>
      </div>

      <Form.Group className="mb-3">
        <Form.Select
          name="role_type"
          value={formik.values.role_type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.role_type && formik.errors.role_type}
        >
          <option value="">Yetki Seçiniz</option>
          {roles.map(role => (
            <option key={role.role_type} value={role.role_type}>{role.role_name}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.role_type}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading} className="w-100">
        {loading ? (
          <>
            <Spinner size="sm" className="me-2" animation="border" />
            {submitText === "Kaydet" ? "Kaydediliyor..." : "Güncelleniyor..."}
          </>
        ) : (
          submitText
        )}
      </Button>
    </Form>
  );
};

export default UserForm;
