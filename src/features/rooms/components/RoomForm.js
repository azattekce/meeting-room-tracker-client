// src/features/room/components/RoomForm.js
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const RoomForm = ({ formData, validationErrors, setFormData, onSubmit, loading }) => {
  // Defensive programming - formData undefined olması durumunda varsayılan değerler
  const safeFormData = formData || {};
  const safeValidationErrors = validationErrors || {};

  return (
    <form onSubmit={onSubmit}>
      {['room_name', 'location', 'capacity'].map(field => (
        <div className="mb-3" key={field}>
          <input
            type={field === 'capacity' ? 'number' : 'text'}
            className={`form-control ${safeValidationErrors[field] ? 'is-invalid' : ''}`}
            placeholder={
              field === 'room_name' ? 'Oda Adı' :
              field === 'location' ? 'Konum' :
              field === 'capacity' ? 'Kapasite' :
              field.charAt(0).toUpperCase() + field.slice(1)
            }
            value={safeFormData[field] || ''}
            onChange={(e) => setFormData({ ...safeFormData, [field]: e.target.value })}
            min={field === 'capacity' ? '1' : undefined}
            max={field === 'capacity' ? '1000' : undefined}
          />
          {/* {validationErrors[field] && <div className="invalid-feedback">{validationErrors[field]}</div>} */}
          {safeValidationErrors[field] && <div className="invalid-feedback">{safeValidationErrors[field]}</div>}
        </div>
      ))}

      <div className="mb-3">
        <select
          className={`form-control ${safeValidationErrors.room_type ? 'is-invalid' : ''}`}
          value={safeFormData.room_type || ''}
          onChange={(e) => setFormData({ ...safeFormData, room_type: e.target.value })}
        >
          <option value="">Oda Tipi Seçiniz</option>
          <option value="Toplantı Odası">Toplantı Odası</option>
          <option value="Konferans Salonu">Konferans Salonu</option>
          <option value="Eğitim Odası">Eğitim Odası</option>
          <option value="Sunum Odası">Sunum Odası</option>
          <option value="Telefon Odası">Telefon Odası</option>
          <option value="Çalışma Alanı">Çalışma Alanı</option>
        </select>
        {safeValidationErrors.room_type && <div className="invalid-feedback">{safeValidationErrors.room_type}</div>}
      </div>

    </form>
  );
};

export default RoomForm;