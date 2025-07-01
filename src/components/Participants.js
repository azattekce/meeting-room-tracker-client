import React, { useEffect, useState } from 'react';

const Participants = ({ meetingId }) => {
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState({ user_id: '', status: 'invited' });

  // ✅ Katılımcıları Getir
  const fetchParticipants = () => {
    fetch(`http://localhost:8000/meetings/${meetingId}/participants`)
      .then(response => response.json())
      .then(data => setParticipants(data));
  };

  useEffect(() => {
    fetchParticipants();
  }, [meetingId]);

  // ✅ Katılımcı Ekle
  const handleAddParticipant = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/meetings/${meetingId}/participants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newParticipant, meeting_id: meetingId })
    })
      .then(response => response.json())
      .then(() => {
        fetchParticipants();
        setNewParticipant({ user_id: '', status: 'invited' });
      });
  };

  // ✅ Katılım Durumunu Güncelle
  const updateStatus = (participantId, status) => {
    fetch(`http://localhost:8000/participants/${participantId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(response => response.json())
      .then(() => fetchParticipants());
  };

  return (
    <div className="container mt-4">
      <h3>Katılımcılar (Toplantı ID: {meetingId})</h3>

      {/* ✅ Katılımcı Ekleme Formu */}
      <form onSubmit={handleAddParticipant} className="mb-3">
        <div className="row">
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Kullanıcı ID"
              value={newParticipant.user_id}
              onChange={e => setNewParticipant({ ...newParticipant, user_id: e.target.value })}
              required
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              value={newParticipant.status}
              onChange={e => setNewParticipant({ ...newParticipant, status: e.target.value })}
            >
              <option value="invited">Davet Edildi</option>
              <option value="accepted">Kabul Edildi</option>
              <option value="declined">Reddedildi</option>
            </select>
          </div>
          <div className="col">
            <button className="btn btn-primary" type="submit">Katılımcı Ekle</button>
          </div>
        </div>
      </form>

      {/* ✅ Katılımcı Listesi */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Kullanıcı ID</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(participant => (
            <tr key={participant.id}>
              <td>{participant.user_id}</td>
              <td>{participant.status}</td>
              <td>
                <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(participant.id, 'accepted')}>Kabul Et</button>
                <button className="btn btn-danger btn-sm" onClick={() => updateStatus(participant.id, 'declined')}>Reddet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Participants;
