import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

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
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <input
          name="title"
          type="text"
          className={`form-control ${errors?.title ? 'is-invalid' : ''}`}
          placeholder="Title"
          value={values?.title || ''}
          onChange={handleChange}
        />
        {errors?.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <textarea
          name="description"
          className={`form-control ${errors?.description ? 'is-invalid' : ''}`}
          placeholder="Description"
          value={values?.description || ''}
          rows={3}
          onChange={handleChange}
        />
        {errors?.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      <div className="mb-3">
        <select
          name="room_id"
          className={`form-control ${errors?.room_id ? 'is-invalid' : ''}`}
          value={values?.room_id || ''}
          onChange={handleChange}
        >
          <option value="">Oda Seç</option>
          {rooms.map((room) => (
            <option key={room.room_id} value={room.room_id}>{room.room_name}</option>
          ))}
        </select>
        {errors?.room_id && <div className="invalid-feedback">{errors.room_id}</div>}
      </div>

      <div className="mb-3">
        <input
          name="date"
          type="date"
          className={`form-control ${errors?.date ? 'is-invalid' : ''}`}
          value={values?.date || ''}
          onChange={handleChange}
        />
        {errors?.date && <div className="invalid-feedback">{errors.date}</div>}
      </div>

      <div className="row mb-3">
        <div className="col-6">
          <input
            name="startTime"
            type="time"
            className={`form-control ${errors?.startTime ? 'is-invalid' : ''}`}
            placeholder="Start Time"
            value={values?.startTime || ''}
            onChange={handleChange}
          />
          {errors?.startTime && <div className="invalid-feedback">{errors.startTime}</div>}
        </div>

        <div className="col-6">
          <input
            name="endTime"
            type="time"
            className={`form-control ${errors?.endTime ? 'is-invalid' : ''}`}
            placeholder="End Time"
            value={values?.endTime || ''}
            onChange={handleChange}
          />
          {errors?.endTime && <div className="invalid-feedback">{errors.endTime}</div>}
        </div>
      </div>

      <div className="mb-3">
        <select
          name="attendees"
          multiple
          className={`form-control ${errors?.attendees ? 'is-invalid' : ''}`}
          value={values?.attendees || []}
          onChange={handleAttendeeChange}
          style={{ height: '120px' }}
        >
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.firstname} {user.lastname}
            </option>
          ))}
        </select>
        {errors?.attendees && <div className="invalid-feedback">{errors.attendees}</div>}
        <small className="form-text text-muted">Hold Ctrl (or Cmd) to select multiple attendees</small>
      </div>
      <Button type="submit" variant="primary" disabled={submitting} className="w-100">
        {submitting ? <><Spinner size="sm" className="me-2" animation="border" />Saving...</> : "Save Meeting"}
      </Button>
    </form>
  );
};

export default MeetingForm;