import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useMeetingHandlers } from '../hooks/useMeetingHandlers';
import AddModal from '../components/AddModal';
import ParticipantsList from '../components/ParticipantsList';
import MyToastComponent from '../../common/MyToastComponent';
import { useAuth } from '../../auth/hooks/useAuth';
import MeetingItem from '../components/MeetingItem';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import { useEffect } from 'react';


const Meetings = () => {
 


  const {
    meetings, rooms, users,
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    selectedMeetingId, setSelectedMeetingId,
    editingMeetingId, setEditingMeetingId,
    meetingToDelete, setMeetingToDelete,
    handleEditMeeting, handleDeleteMeeting, confirmDeleteMeeting,
    handleCreateMeeting, handleUpdateMeeting,
    toast, setToast,
    formData, setFormData,
    validationErrors, setValidationErrors,
    handleSubmit, loading, handleEditSubmit
  } = useMeetingHandlers();


  const auth = useAuth();
  const isAdmin = 1; // auth.user && auth.user.role_type === 1;
  
  useEffect(() => {
      // auth içindeki yetkileri göstermek veya başka işlemler için kullanılabilir
      console.log('Auth roles:', auth.getRoles());
    }, [auth]);
  

  // Find the currently editing meeting to pass to EditModal
  const editingMeeting = meetings.find(meeting => meeting.meeting_id === editingMeetingId);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Toplantılar</h2>
            {isAdmin && (
              <Button variant="primary" onClick={() => setShowModal(true)}>
                + 
              </Button>
            )}
          </div>

          {meetings.length === 0 ? (
            <div className="text-center p-5 text-muted">
              <p>Henüz toplantı bulunmuyor.</p>
              {isAdmin && (
                <Button variant="outline-primary" onClick={() => setShowModal(true)}>
                  İlk Toplantıyı Oluştur
                </Button>
              )}
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {meetings.map(meeting => {
                const room = rooms.find(r => r.room_id === meeting.room_id);
                return (
                  <Col key={meeting.meeting_id}>
                    <MeetingItem
                      meeting={meeting}
                      room={room}
                      onViewParticipants={setSelectedMeetingId}
                      onEdit={handleEditMeeting}
                      onDelete={handleDeleteMeeting}
                      isAdmin={isAdmin}
                    />
                  </Col>
                );
              })}  
            </Row>     
          )}
        </Card.Body>
      </Card>

      {selectedMeetingId && (
        <ParticipantsList meetingId={selectedMeetingId} />
      )}

      {/* Modal and Toast Components */}
      
      <AddModal
       showModal={showModal}
       setShowModal={setShowModal}
       formData={formData}
       users={users}
       rooms={rooms}
       validationErrors={validationErrors}
       setFormData={setFormData}
       handleSubmit={handleSubmit}
       loading={loading}
     />
      
      <EditModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        formData={formData}
        users={users}
        rooms={rooms}
        validationErrors={validationErrors}
        setFormData={setFormData}
       handleSubmit={handleEditSubmit}
       loading={loading}
      />
      
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={() => confirmDeleteMeeting(meetingToDelete)}
      />

      <MyToastComponent 
        toast={toast}
        setToast={setToast}
      />
    </Container>
  );
};

export default Meetings;