import React from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';

const MeetingForm = ({ formik, formData, setFormData, rooms, users, validationErrors, onSubmit, loading }) => {
  // If a Formik-like bag is provided, prefer it. Otherwise fall back to controlled props.
  const values = formik ? formik.values : formData;
  const errors = formik ? formik.errors : validationErrors;
  const submitting = formik ? formik.isSubmitting : loading;
  const handleChange = (e) => {
    if (formik && typeof formik.handleChange === 'function') return formik.handleChange(e);
    const { name, value } = e.target;
    if (e.target.multiple) {
      const selected = Array.from(e.target.selectedOptions).map(o => o.value);
      setFormData({ ...formData, attendees: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleAttendeeChange = (e) => {
    if (formik && typeof formik.handleChange === 'function') return formik.handleChange(e);
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, attendees: selectedOptions });
  };
  const handleSubmit = (e) => {
    if (formik && typeof formik.handleSubmit === 'function') return formik.handleSubmit(e);
    return onSubmit && onSubmit(e);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="meetingTitle">
        <Form.Label>Başlık</Form.Label>
        <Form.Control
          name="title"
          type="text"
          placeholder="Başlık"
          value={values?.title || ''}
          onChange={handleChange}
          isInvalid={!!errors?.title}
        />
        <Form.Control.Feedback type="invalid">{errors?.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="meetingDescription">
        <Form.Label>Açıklama</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          placeholder="Açıklama"
          value={values?.description || ''}
          onChange={handleChange}
          isInvalid={!!errors?.description}
        />
        <Form.Control.Feedback type="invalid">{errors?.description}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="meetingRoom">
        <Form.Label>Oda</Form.Label>
        <Form.Control
          name="room_id"
          as="select"
          value={values?.room_id || ''}
          onChange={handleChange}
          isInvalid={!!errors?.room_id}
        >
          <option value="">Oda Seç</option>
          {rooms.map((room) => (
            <option key={room.room_id} value={room.room_id}>{room.room_name}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors?.room_id}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="meetingDate">
        <Form.Label>Tarih</Form.Label>
        <Form.Control
          name="date"
          type="date"
          value={values?.date || ''}
          onChange={handleChange}
          isInvalid={!!errors?.date}
        />
        <Form.Control.Feedback type="invalid">{errors?.date}</Form.Control.Feedback>
      </Form.Group>

      <div className="row">
        <div className="col-6">
          <Form.Group className="mb-3" controlId="meetingStart">
            <Form.Label>Başlangıç</Form.Label>
            <Form.Control
              name="startTime"
              type="time"
              value={values?.startTime || ''}
              onChange={handleChange}
              isInvalid={!!errors?.startTime}
            />
            <Form.Control.Feedback type="invalid">{errors?.startTime}</Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="col-6">
          <Form.Group className="mb-3" controlId="meetingEnd">
            <Form.Label>Bitiş</Form.Label>
            <Form.Control
              name="endTime"
              type="time"
              value={values?.endTime || ''}
              onChange={handleChange}
              isInvalid={!!errors?.endTime}
            />
            <Form.Control.Feedback type="invalid">{errors?.endTime}</Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>

      <Form.Group className="mb-3" controlId="meetingAttendees">
        <Form.Label>Katılımcılar</Form.Label>
        <Form.Control
          name="attendees"
          as="select"
          multiple
          value={values?.attendees || []}
          onChange={handleAttendeeChange}
          isInvalid={!!errors?.attendees}
          style={{ height: 140 }}
        >
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.firstname} {user.lastname}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors?.attendees}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" disabled={submitting} className="w-100">
        {submitting ? <><Spinner size="sm" className="me-2" animation="border" />Kaydediliyor...</> : "Kaydet"}
      </Button>
    </Form>
  );
};

export default MeetingForm;