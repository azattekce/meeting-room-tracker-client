// src/features/rooms/components/RoomForm.js
import React from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';

const RoomForm = ({ formik, loading, submitText = "Kaydet" }) => {
  const roomTypes = [
    'Toplantı Odası',
    'Konferans Salonu',
    'Eğitim Odası',
    'Sunum Odası',
    'Telefon Odası',
    'Çalışma Alanı'
  ];

  // Debug için
  console.log('RoomForm formik:', formik);
  console.log('RoomForm formik.values:', formik?.values);

  return (
    <Form onSubmit={formik?.handleSubmit}>
      {/* Room Name */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Oda Adı"
          name="room_name"
          value={formik.values.room_name || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.room_name && formik.errors.room_name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.room_name}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Location */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Konum"
          name="location"
          value={formik.values.location || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.location && formik.errors.location}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.location}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Capacity */}
      <Form.Group className="mb-3">
        <Form.Control
          type="number"
          placeholder="Kapasite"
          name="capacity"
          value={formik.values.capacity || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.capacity && formik.errors.capacity}
          min="1"
          max="1000"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.capacity}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Room Type */}
      <Form.Group className="mb-3">
        <Form.Select
          name="room_type"
          value={formik.values.room_type || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.room_type && formik.errors.room_type}
        >
          <option value="">Oda Tipi Seçiniz</option>
          {roomTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.room_type}
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

export default RoomForm;