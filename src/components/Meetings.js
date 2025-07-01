import React, { useEffect, useState } from 'react';
import Participants from './Participants';
import axios from 'axios';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    meeting_title: '',
    start_time: '',
    end_time: '',
    room_id: '',
  });
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // ✅ Toplantıları, Odaları ve Kullanıcıları Getir
  useEffect(() => {
    fetchMeetings();
    fetchRooms();
    fetchUsers();
  }, []);

  const fetchMeetings = async () => {
    const response = await axios.get('http://localhost:8000/meetings');
    setMeetings(response.data);
  };

  const fetchRooms = async () => {
    const response = await axios.get('http://localhost:8000/rooms');
    console.log('Rooms:', response.data); // ✅ Odaları Konsola Yazdır
    setRooms(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8000/users');
    setUsers(response.data);
  };

  // ✅ Toplantı Oluştur
  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    try {
      console.log('Yeni Toplantı:', newMeeting);
      const response = await axios.post('http://localhost:8000/meetings', newMeeting);
      const meetingId = response.data.id;
      console.log('Yeni Toplantı ID:', meetingId);

      // ✅ Katılımcıları Davet Et
      console.log('Seçilen Kullanıcılar:', selectedUsers);
      await Promise.all(selectedUsers.map(userId =>
        axios.post(`http://localhost:8000/meetings/${meetingId}/participants`, {
          meeting_id: meetingId,
          user_id: userId,
          status: 'invited',
        })
      ));
      console.log('Toplantıya katılımcılar başarıyla eklendi!');

      alert('Toplantı başarıyla oluşturuldu!');
      setShowModal(false);
      setNewMeeting({ meeting_title: '', start_time: '', end_time: '', room_id: '' });
      setSelectedUsers([]);
      fetchMeetings();
    } catch (error) {
      console.log('Hata:', error.response.data.detail);
      console.error('Toplantı oluşturulurken hata:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Toplantılar</h2>

      {/* ✅ Toplantı Ekle Butonu */}
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        + Toplantı Ekle
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Başlangıç</th>
            <th>Bitiş</th>
            <th>Oda</th>
            <th>Katılımcılar</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.meeting_id}>
              <td>{meeting.meeting_title}</td>
              <td>{meeting.start_time}</td>
              <td>{meeting.end_time}</td>
              <td>{rooms.find(room => room.room_id === meeting.room_id)?.room_name || 'Oda Yok'}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => setSelectedMeetingId(meeting.id)}
                >
                  Katılımcıları Görüntüle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Katılımcılar Bileşeni */}
      {selectedMeetingId && <Participants meetingId={selectedMeetingId} />}

      {/* ✅ Toplantı Oluşturma Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Toplantı Oluştur</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateMeeting}>
                  <div className="mb-3">
                    <label className="form-label">Toplantı Başlığı</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newMeeting.meeting_title}
                      onChange={(e) =>
                        setNewMeeting({ ...newMeeting, meeting_title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Başlangıç Saati</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={newMeeting.start_time}
                      onChange={(e) =>
                        setNewMeeting({ ...newMeeting, start_time: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Bitiş Saati</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={newMeeting.end_time}
                      onChange={(e) =>
                        setNewMeeting({ ...newMeeting, end_time: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* ✅ Oda Seçimi */}
                  <div className="mb-3">
                    <label className="form-label">Oda Seçin</label>
                    <select
                      className="form-select"
                      value={newMeeting.room_id}
                      onChange={(e) =>
                      
                        setNewMeeting({ ...newMeeting, room_id: e.target.value })
                      }
                      required
                    >
                      <option value="">Oda Seçin</option>
                      {rooms.map((room) => (                   
                        <option key={room.room_id} value={room.room_id}>
                          {room.room_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ✅ Katılımcı Seçimi */}
                  <div className="mb-3">
                    <label className="form-label">Katılımcılar</label>
                    <select
                      multiple
                      className="form-select"
                      value={selectedUsers}
                      onChange={(e) =>
                        setSelectedUsers(
                          Array.from(e.target.selectedOptions, (option) => option.value)
                        )
                      }
                    >
                      {users.map((user) => (
                        console.log('user:', user.username),
                        <option key={user.id} value={user.id}>
                          {user.username} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-success">Toplantıyı Kaydet</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;
