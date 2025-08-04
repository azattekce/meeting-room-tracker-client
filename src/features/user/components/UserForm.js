// UserForm.jsx
import React from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';

const UserForm = ({ formik, roles, loading, submitText = "Kaydet" }) => {
  return (
    <Form onSubmit={formik.handleSubmit}>
      {['username', 'firstname', 'lastname', 'gsm', 'email'].map(field => (
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
