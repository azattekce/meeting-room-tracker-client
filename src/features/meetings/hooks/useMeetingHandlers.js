import { useState } from 'react';
import { useMeetingForm } from './useMeetingForm';
import { useMeetingsApi } from './useMeetingApi';
import { useModals } from './useModals';

export const useMeetingHandlers = () => {
  
  
  const {
    meetings, rooms, users,
    addMeeting, updateMeeting, deleteMeeting,
    getParticipants, addParticipant,
    loadMeetings,
    loadRooms, loadUsers
  } = useMeetingsApi();


  const {
    formData, setFormData,
    validationErrors, setValidationErrors,
    validateForm, resetForm, updateFormData
  } = useMeetingForm();

  const {
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    selectedMeetingId, setSelectedMeetingId,
    editingMeetingId, setEditingMeetingId,
    meetingToDelete, setMeetingToDelete
  } = useModals();

  const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });
  const [loading, setLoading] = useState(false);

  // Handle form submission for creating a new meeting
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setToast({ show: true, message: 'Lütfen zorunlu alanları doldurunuz!', variant: 'danger' });
      return;
    }    
    setLoading(true);
    try {
      // Transform formData to match API expectations
      const meetingData = {
        meeting_title: formData.title,
        description: formData.description,
        room_id: formData.roomId,
        start_time: `${formData.date}T${formData.startTime}`,
        end_time: `${formData.date}T${formData.endTime}`
      };
      
      // Create meeting
      const meetingId = await addMeeting(meetingData);
      
      // Add participants
      await Promise.all(formData.attendees.map(userId =>
        addParticipant(meetingId, {
          meeting_id: meetingId,
          user_id: userId,
          status: 'invited'
        })
      ));
      
      resetForm();
      setShowModal(false);
      loadMeetings();
      loadRooms();
      loadUsers();
      setToast({ show: true, message: 'Toplantı başarıyla oluşturuldu!', variant: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.detail || 'Toplantı oluşturulurken hata oluştu!', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  // Prepare for editing a meeting
  const handleEditMeeting = async (meeting) => {
    setEditingMeetingId(meeting.meeting_id);
    
    try {
      // Get participants for the meeting
      const participants = await getParticipants(meeting.meeting_id);
      const participantIds = participants.map(p => p.user_id.toString());
      
      // Update the form with meeting data
      updateFormData({
        id: meeting.meeting_id,
        title: meeting.meeting_title,
        description: meeting.description || '',
        room_id: meeting.room_id,
        date: meeting.start_time.split('T')[0], // Extract date part
        startTime: meeting.start_time.split('T')[1], // Extract start time
        endTime: meeting.end_time.split('T')[1], // Extract end time
        attendees: participantIds
        // Note: The date and time fields will be handled by updateFormData
        // using the start_time and end_time from the meeting
      });
      
      setShowEditModal(true);
    } catch (error) {
      setToast({ show: true, message: 'Toplantı bilgileri yüklenirken hata oluştu!', variant: 'danger' });
    }
  };

  // Handle form submission for updating a meeting
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setToast({ show: true, message: 'Eksik alanlar var!', variant: 'danger' });
      return;
    }
    
    setLoading(true);
    try {
      // Transform formData to match API expectations
      const meetingData = {
        meeting_title: formData.title,
        description: formData.description,
        room_id: formData.room_id,
        start_time: `${formData.date}T${formData.startTime}`,
        end_time: `${formData.date}T${formData.endTime}`
      };
      
      // Update meeting
      await updateMeeting(editingMeetingId, meetingData);
      
      // Get current participants
      const currentParticipants = await getParticipants(editingMeetingId);
      const currentIds = currentParticipants.map(p => p.user_id.toString());
      const newIds = formData.attendees;
      
      // We'd need an API to remove participants
      // For now, we'll just add the new participants
      // This might cause duplication if your API doesn't handle it
      await Promise.all(newIds.map(userId =>
        addParticipant(editingMeetingId, {
          meeting_id: editingMeetingId,
          user_id: userId,
          status: 'invited'
        })
      ));
      
      loadMeetings();
      setShowEditModal(false);
      setToast({ show: true, message: 'Toplantı güncellendi!', variant: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.detail || 'Toplantı güncellenirken hata oluştu!', variant: 'danger' });
    } finally {
      setLoading(false);
      setEditingMeetingId(null);
    }
  };

  // Prepare for deleting a meeting
  const handleDeleteMeeting = (meetingId) => {
    setMeetingToDelete(meetingId);
    setShowDeleteModal(true);
  };

  // Confirm and execute meeting deletion
  const confirmDeleteMeeting = async () => {
    try {
      await deleteMeeting(meetingToDelete);
      loadMeetings();
      setToast({ show: true, message: 'Toplantı silindi!', variant: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.detail || 'Toplantı silinirken hata oluştu!', variant: 'danger' });
    } finally {
      setShowDeleteModal(false);
      setMeetingToDelete(null);
    }
  };

  return {
    meetings, rooms, users, formData, validationErrors,
    showModal, showEditModal, showDeleteModal, 
    selectedMeetingId, editingMeetingId, meetingToDelete,
    toast, loading,
    setShowModal, setShowEditModal, setShowDeleteModal,
    setSelectedMeetingId, setEditingMeetingId, setMeetingToDelete,
    handleSubmit, handleEditSubmit, handleEditMeeting, handleDeleteMeeting, confirmDeleteMeeting,
    setFormData, setToast,
  };
};