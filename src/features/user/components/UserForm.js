// UserForm.jsx
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const UserForm = ({ formData, roles, validationErrors, setFormData, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      {['username', 'firstname', 'lastname', 'gsm', 'email'].map(field => (
        <div className="mb-3" key={field}>
          <input
            className={`form-control ${validationErrors[field] ? 'is-invalid' : ''}`}
            placeholder={field === 'gsm' ? 'GSM' : field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
          {validationErrors[field] && <div className="invalid-feedback">{validationErrors[field]}</div>}
        </div>
      ))}

      <div className="mb-3">
        <select
          className={`form-control ${validationErrors.role_type ? 'is-invalid' : ''}`}
          value={formData.role_type}
          onChange={(e) => setFormData({ ...formData, role_type: parseInt(e.target.value) })}
        >
          <option value="">Yetki Seçiniz</option>
          {roles.map(role => (
            <option key={role.role_type} value={role.role_type}>{role.role_name}</option>
          ))}
        </select>
        {validationErrors.role_type && <div className="invalid-feedback">{validationErrors.role_type}</div>}
      </div>

      <Button type="submit" variant="primary" disabled={loading} className="w-100">
        {loading ? <><Spinner size="sm" className="me-2" animation="border" />Kaydediliyor...</> : "Kaydet"}
      </Button>
    </form>
  );
};

export default UserForm;
