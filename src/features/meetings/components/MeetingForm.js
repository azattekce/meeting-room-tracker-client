import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const MeetingForm = ({ formData, setFormData, rooms, users, validationErrors, onSubmit, loading }) => {
  const handleAttendeeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, attendees: selectedOptions });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className={`form-control ${validationErrors.title ? 'is-invalid' : ''}`}
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {validationErrors.title && <div className="invalid-feedback">{validationErrors.title}</div>}
      </div>

      <div className="mb-3">
        <textarea
          className={`form-control ${validationErrors.description ? 'is-invalid' : ''}`}
          placeholder="Description"
          value={formData.description}
          rows={3}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        {validationErrors.description && <div className="invalid-feedback">{validationErrors.description}</div>}
      </div>

      <div className="mb-3">
        <select
          className={`form-control ${validationErrors.room_id ? 'is-invalid' : ''}`}
          value={formData.room_id}
          onChange={(e) => setFormData({ ...formData, room_id: e.target.value })}
        >
          <option value="">Oda Seç</option>
          {rooms.map((room) => (
            <option key={room.room_id} value={room.room_id}>{room.room_name}</option>
          ))}
        </select>
        {validationErrors.room_id && <div className="invalid-feedback">{validationErrors.room_id}</div>}
      </div>

      <div className="mb-3">
        <input
          type="date"
          className={`form-control ${validationErrors.date ? 'is-invalid' : ''}`}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        {validationErrors.date && <div className="invalid-feedback">{validationErrors.date}</div>}
      </div>

      <div className="row mb-3">
        <div className="col-6">
          <input
            type="time"
            className={`form-control ${validationErrors.startTime ? 'is-invalid' : ''}`}
            placeholder="Start Time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
          {validationErrors.startTime && <div className="invalid-feedback">{validationErrors.startTime}</div>}
        </div>

        <div className="col-6">
          <input
            type="time"
            className={`form-control ${validationErrors.endTime ? 'is-invalid' : ''}`}
            placeholder="End Time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
          {validationErrors.endTime && <div className="invalid-feedback">{validationErrors.endTime}</div>}
        </div>
      </div>

      <div className="mb-3">
        <select
          multiple
          className={`form-control ${validationErrors.attendees ? 'is-invalid' : ''}`}
          value={formData.attendees}
          onChange={handleAttendeeChange}
          style={{ height: '120px' }}
        >
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.firstname} {user.lastname}
            </option>
          ))}
        </select>
        {validationErrors.attendees && <div className="invalid-feedback">{validationErrors.attendees}</div>}
        <small className="form-text text-muted">Hold Ctrl (or Cmd) to select multiple attendees</small>
      </div>

      <Button type="submit" variant="primary" disabled={loading} className="w-100">
        {loading ? <><Spinner size="sm" className="me-2" animation="border" />Saving...</> : "Save Meeting"}
      </Button>
    </form>
  );
};

export default MeetingForm;