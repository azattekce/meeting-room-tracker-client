import React, { useEffect, useCallback, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import MyToastComponent from '../../common/MyToastComponent';
import { useMeetingsCrud } from '../hooks/useMeetingsCrud';
import { useMeetingsUI } from '../hooks/useMeetingsUI';
import { useMeetingsForm } from '../hooks/useMeetingsForm';
import MeetingItem from '../components/MeetingItem';
import ParticipantsList from '../components/ParticipantsList';

const Meetings = () => {
  const { meetings = [], rooms = [], users = [], loading = false, loadMeetings, loadRooms, loadUsers, addMeeting, updateMeeting, deleteMeeting } = useMeetingsCrud();

  const {
    showModal,
    setShowModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    selectedMeetingId,
    setSelectedMeetingId,
    toast,
    setToast
  } = useMeetingsUI();

  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddSubmit = useCallback(async (values) => {
    try {
      await addMeeting(values, values.attendees || []);
      setShowModal(false);
      setToast({ show: true, message: 'Toplantı başarıyla oluşturuldu!', variant: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: 'Toplantı oluşturulamadı', variant: 'danger' });
    }
  }, [addMeeting, setShowModal, setToast]);

  const handleEditSubmit = useCallback(async (values) => {
    try {
      const id = selectedItem?.meeting_id || selectedItem?.id;
      await updateMeeting(id, values);
      setShowEditModal(false);
      setToast({ show: true, message: 'Toplantı güncellendi!', variant: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: 'Toplantı güncellenemedi', variant: 'danger' });
    }
  }, [updateMeeting, selectedItem, setShowEditModal, setToast]);

  const { addFormik, editFormik, resetForms } = useMeetingsForm(handleAddSubmit, handleEditSubmit);

  useEffect(() => {
    loadMeetings();
    loadRooms();
    loadUsers();
  }, [loadMeetings, loadRooms, loadUsers]);

  const handleOpenAdd = () => {
    resetForms();
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleOpenEdit = (meeting) => {
    resetForms();
    // populate edit form
    editFormik.setValues({
      title: meeting.title || '',
      description: meeting.description || '',
      room_id: meeting.room_id || '',
      date: meeting.date || '',
      startTime: meeting.startTime || meeting.start_time || '',
      endTime: meeting.endTime || meeting.end_time || '',
      attendees: (meeting.attendees || []).map(a => a.user_id ? String(a.user_id) : String(a))
    });
    setSelectedItem(meeting);
    setShowEditModal(true);
  };

  const handleOpenDelete = (meeting) => {
    setSelectedItem(meeting);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const id = selectedItem?.meeting_id || selectedItem?.id;
      await deleteMeeting(id);
      setShowDeleteModal(false);
      setToast({ show: true, message: 'Toplantı silindi!', variant: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: 'Toplantı silinemedi', variant: 'danger' });
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Toplantılar</h2>
            <Button variant="primary" onClick={handleOpenAdd}>
              <FaPlus className="me-2" /> Yeni Toplantı
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {meetings && meetings.length > 0 ? (
                meetings.map(meeting => {
                  const room = rooms.find(r => r.room_id === meeting.room_id);
                  return (
                    <Col key={meeting.meeting_id}>
                      <MeetingItem
                        meeting={meeting}
                        room={room}
                        onViewParticipants={setSelectedMeetingId}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                        isAdmin={true}
                      />
                    </Col>
                  );
                })
              ) : (
                <Col>
                  <p className="text-center">Henüz toplantı bulunmuyor.</p>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>

      {/* Participants */}
      {selectedMeetingId && (
        <ParticipantsList meetingId={selectedMeetingId} />
      )}

      {/* Modals */}
      <AddModal showModal={showModal} setShowModal={setShowModal} formik={addFormik} users={users} rooms={rooms} loading={loading} />

      <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} formik={editFormik} users={users} rooms={rooms} loading={loading} />

      <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleDelete={handleDeleteConfirm} />

      <MyToastComponent show={toast?.show} onClose={() => setToast({ ...toast, show: false })} message={toast?.message} variant={toast?.variant || 'success'} />
    </Container>
  );
};

export default Meetings;