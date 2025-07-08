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
    loadRooms, loadUsers,loadParticipants
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
  const handleCreateMeeting = async (e) => {
    // e parametresi event objesi olmayabilir, bu yüzden kontrol edelim
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setToast({ show: true, message: 'Lütfen zorunlu alanları doldurunuz!', variant: 'danger' });
      return;
    }    
    setLoading(true);
    try {
     
      // Create meeting
      alert("handleCreateMeeting called with formData: " + JSON.stringify(formData, null, 2));
      const meetingId = await addMeeting(formData);
      
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
      console.error('Meeting creation error:', error);
      console.error('Error response data:', error.response?.data);
      
      // Backend'den gelen hata mesajını string'e çevir
      let errorMessage = 'Toplantı oluşturulurken hata oluştu!';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
          } else {
            errorMessage = errorData.detail;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (Array.isArray(errorData)) {
          errorMessage = errorData.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
        } else {
          errorMessage = JSON.stringify(errorData);
        }
      }
      
      setToast({ show: true, message: errorMessage, variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  // Prepare for editing a meeting
  const handleEditMeeting = async (meeting) => {
    alert("handleEditMeeting called with meeting: " + JSON.stringify(meeting, null, 2));
    setEditingMeetingId(meeting.meeting_id);
    
    try {
      // Get participants for the meeting
      const participants = await loadParticipants(meeting.meeting_id);
      const participantIds = participants.map(p => p.user_id.toString());
      
      // Update the form with meeting data
      updateFormData({
        meeting_id: meeting.meeting_id,
        id: meeting.meeting_id, // Use meeting_id as id
        title: meeting.title,
        description: meeting.description || '',
        room_id: parseInt(meeting.room_id),
        date: meeting.date, // Extract date part
        startTime: meeting.starttime, // Extract start time
        endTime: meeting.endtime, // Extract end time
        attendees: participantIds
        // Note: The date and time fields will be handled by updateFormData
        // using the start_time and end_time from the meeting
      });
   
      setShowEditModal(true);
    } catch (error ) {
         // Backend'den gelen hata mesajını string'e çevir
           let errorMessage = 'Toplantı detay çekilirken hata oluştu!';
          if (error.response?.data) {
                  const errorData = error.response.data;
                  
                  if (typeof errorData === 'string') {
                    errorMessage = errorData;
                  } else if (errorData.detail) {
                    if (Array.isArray(errorData.detail)) {
                      errorMessage = errorData.detail.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
                    } else {
                      errorMessage = errorData.detail;
                    }
                  } else if (errorData.message) {
                    errorMessage = errorData.message;
                  } else if (Array.isArray(errorData)) {
                    errorMessage = errorData.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
                  } else {
                    errorMessage = JSON.stringify(errorData);
                  }
                }

      alert('Error loading meeting data for edit: ' + errorMessage);
      setToast({ show: true, message: 'Toplantı bilgileri yüklenirken hata oluştu!', variant: 'danger' });
    }
  };

  // Handle form submission for updating a meeting
  const handleEditSubmit = async (e) => {

    alert("handleEditSubmit called with formData-1: " + JSON.stringify(formData, null, 2));
    // Aynı kontrolü burada da uygulayın
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setToast({ show: true, message: 'Eksik alanlar var!', variant: 'danger' });
      return;
    }
    
    setLoading(true);
    try {
      // Transform formData to match API expectations
         
      alert("handleEditSubmit called with formData-2: " + JSON.stringify(formData, null, 2));
      // Update meeting
      await updateMeeting(editingMeetingId, formData);
      
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
      console.error('Meeting update error:', error);
      console.error('Error response data:', error.response?.data);
      
      // Backend'den gelen hata mesajını string'e çevir
      let errorMessage = 'Toplantı güncellenirken hata oluştu!';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
          } else {
            errorMessage = errorData.detail;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (Array.isArray(errorData)) {
          errorMessage = errorData.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
        } else {
          errorMessage = JSON.stringify(errorData);
        }
      }
      
      setToast({ show: true, message: errorMessage, variant: 'danger' });
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
      console.error('Meeting deletion error:', error);
      console.error('Error response data:', error.response?.data);
      
      // Backend'den gelen hata mesajını string'e çevir
      let errorMessage = 'Toplantı silinirken hata oluştu!';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
          } else {
            errorMessage = errorData.detail;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = JSON.stringify(errorData);
        }
      }
      
      setToast({ show: true, message: errorMessage, variant: 'danger' });
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
    handleCreateMeeting, handleEditSubmit, handleEditMeeting, handleDeleteMeeting, confirmDeleteMeeting,
    setFormData, setToast,
  };
};