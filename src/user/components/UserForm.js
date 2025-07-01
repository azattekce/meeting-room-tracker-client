// components/UserForm.jsx
import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const UserForm = ({
  show,
  onHide,
  onSubmit,
  loading,
  formData,
  setFormData,
  validationErrors,
  roles,
  title = 'Kullanıcı Ekle'
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          {['username', 'firstname', 'lastname', 'gsm', 'email'].map(field => (
            <div className="mb-3" key={field}>
              <input
                className={`form-control ${validationErrors[field] ? 'is-invalid' : ''}`}
                placeholder={field}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              />
              {validationErrors[field] && (
                <div className="invalid-feedback">{validationErrors[field]}</div>
              )}
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
            {validationErrors.role_type && (
              <div className="invalid-feedback">{validationErrors.role_type}</div>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>İptal</Button>
        <Button variant="primary" onClick={onSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Kaydediliyor...
            </>
          ) : (
            "Kaydet"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm;
