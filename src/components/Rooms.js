import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    room_name: "",
    location: "",
    capacity: "",
    room_type: "",
    created_by: "",
  });

  const [editRoom, setEditRoom] = useState(null); // Düzenlenecek oda bilgisi
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  // ✅ Toplantı Odalarını Getir
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Toplantı odaları yüklenirken hata oluştu:", error);
    }
  };

  // ✅ Yeni Oda Ekle
  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/rooms", newRoom);
      setNewRoom({ room_name: "", location: "", capacity: "", room_type: "", created_by: "" });
      fetchRooms(); // Listeyi güncelle
      setShowModal(false);
    } catch (error) {
      console.error("Oda eklenirken hata oluştu:", error);
    }
  };

  // ✅ Odayı Düzenle (Düzenleme Modalını Aç)
  const handleEditClick = (room) => {
    setEditRoom(room);
    setShowEditModal(true);
  };

  // ✅ Odayı Güncelle
  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/rooms/${editRoom.room_id}`, editRoom);
      fetchRooms(); // Listeyi güncelle
      setShowEditModal(false);
    } catch (error) {
      console.error("Oda güncellenirken hata oluştu:", error);
    }
  };

  
  // ✅ Odayı Silme Onay Modalını Aç
  const handleDeleteClick = (roomId) => {
    setRoomToDelete(roomId);
    setShowDeleteModal(true);
  };

  // ✅ Odayı Sil
  const handleDeleteRoom = async () => {
    try {
      await axios.delete(`http://localhost:8000/rooms/${roomToDelete}`);
      fetchRooms(); // Listeyi güncelle
    } catch (error) {
      console.error("Oda silinirken hata oluştu:", error);
    }
    setShowDeleteModal(false);
  };


  return (
    <div className="container mt-4">
      <h2>Toplantı Odaları</h2>

      {/* ✅ Oda Ekle Butonu */}
      <div className="col-12 text-end">
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        + Oda Ekle
      </button>
      </div>
        {/* ✅ Oda Ekleme Modalı */}
        {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Yeni Toplantı Odası Ekle</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddRoom}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Oda Adı"
                    value={newRoom.room_name}
                    onChange={(e) => setNewRoom({ ...newRoom, room_name: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Konum (Bina/Kat)"
                    value={newRoom.location}
                    onChange={(e) => setNewRoom({ ...newRoom, location: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Kapasite"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                    required
                  />
                  <select
                    className="form-select mb-2"
                    value={newRoom.room_type}
                    onChange={(e) => setNewRoom({ ...newRoom, room_type: e.target.value })}
                    required
                  >
                    <option value="">Oda Tipi Seç</option>
                    <option value="Küçük Toplantı Odası">Küçük Toplantı Odası</option>
                    <option value="Konferans Salonu">Konferans Salonu</option>
                    <option value="Eğitim Salonu">Eğitim Salonu</option>
                  </select>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Oluşturan Kullanıcı ID"
                    value={newRoom.created_by}
                    onChange={(e) => setNewRoom({ ...newRoom, created_by: e.target.value })}
                    required
                  />
                  <button type="submit" className="btn btn-primary w-100">
                    Kaydet
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Oda Listesi */}
      <table className="table">
        <thead>
          <tr>
            <th>Oda Adı</th>
            <th>Konum</th>
            <th>Kapasite</th>
            <th>Oda Tipi</th>
            <th>Oluşturan Kullanıcı ID</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.room_id}>
              <td>{room.room_name}</td>
              <td>{room.location}</td>
              <td>{room.capacity}</td>
              <td>{room.room_type}</td>
              <td>{room.created_by}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(room)}>
                  Düzenle
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(room.room_id)}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Düzenleme Modalı */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Odayı Düzenle</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdateRoom}>
                  {/* ✅ Oda Adı */}
                  <label className="form-label">Oda Adı</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editRoom.room_name}
                    onChange={(e) => setEditRoom({ ...editRoom, room_name: e.target.value })}
                    required
                  />

                  {/* ✅ Konum */}
                  <label className="form-label">Konum (Bina/Kat)</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editRoom.location}
                    onChange={(e) => setEditRoom({ ...editRoom, location: e.target.value })}
                    required
                  />

                  {/* ✅ Kapasite */}
                  <label className="form-label">Kapasite</label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    value={editRoom.capacity}
                    onChange={(e) => setEditRoom({ ...editRoom, capacity: e.target.value })}
                    required
                  />

                  {/* ✅ Oda Tipi */}
                  <label className="form-label">Oda Tipi</label>
                  <select
                    className="form-select mb-2"
                    value={editRoom.room_type}
                    onChange={(e) => setEditRoom({ ...editRoom, room_type: e.target.value })}
                    required
                  >
                    <option value="Küçük Toplantı Odası">Küçük Toplantı Odası</option>
                    <option value="Konferans Salonu">Konferans Salonu</option>
                    <option value="Eğitim Salonu">Eğitim Salonu</option>
                  </select>

                  {/* ✅ Oluşturan Kullanıcı ID */}
                  <label className="form-label">Oluşturan Kullanıcı ID</label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    value={editRoom.created_by}
                    onChange={(e) => setEditRoom({ ...editRoom, created_by: e.target.value })}
                    required
                  />

                  <button type="submit" className="btn btn-success w-100">
                    Güncelle
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Silme Onay Modalı */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Onay Gerekiyor</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Bu odayı silmek istediğinize emin misiniz?</p>
                <button className="btn btn-danger me-2" onClick={handleDeleteRoom}>
                  Evet, Sil
                </button>
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Rooms;
