import { useState } from 'react';
import { useMeetingForm } from './useMeetingForm';
import { useMeetingsApi } from './useMeetingApi';
import { useModals } from './useModals';
import moment from 'moment';
import { Alert } from 'react-bootstrap';

export const useMeetingHandlers = () => {
  
  
  const {
    meetings, rooms, users,
    addMeeting, updateMeeting, deleteMeeting,
    getParticipants, addParticipant,
    loadMeetings,
    loadRooms, loadUsers,loadParticipants
  } = useMeetingsApi();

  const {formData, setFormData,
    validationErrors, setValidationErrors,
    validateForm, resetForm
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
    // e parametresi event objesi olmayabilir, bu yüzden kontrol edelim
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      alert("errors: " + JSON.stringify(errors, null, 2));
      setValidationErrors(errors);
      setToast({ show: true, message: 'Lütfen zorunlu alanları doldurunuz!', variant: 'danger' });
      return;
    }    
    setLoading(true);
    try {
     
      // Create meeting
      alert("handleSubmit called with formData: " + JSON.stringify(formData, null, 2));
     const formDataWithTimes = {
        ...formData,
        room_id: parseInt(formData.room_id) // Ensure room_id is an integer
      };
      await addMeeting(formDataWithTimes);

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
  const handleEdit = async (meeting) => {
     
    setEditingMeetingId(meeting.meeting_id);    
    try {
      // Get participants for the meeting
      const participants = await loadParticipants(meeting.meeting_id);
      setFormData({...meeting, attendees: participants.map(p => p.user_id.toString()) }); // Reset formData with meeting details
      setShowEditModal(true);
      //alert("handleEdit called with formData: " + JSON.stringify(formData, null, 2));

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
      
      setToast({ show: true, message: 'Toplantı bilgileri yüklenirken hata oluştu!', variant: 'danger' });
    }
  };

  // Handle form submission for updating a meeting
  const handleEditSubmit = async (e) => {

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
            
      const formDataWithTimes = {
              ...formData,
              room_id: parseInt(formData.room_id) // Ensure room_id is an integer
            };

      await updateMeeting(editingMeetingId, formDataWithTimes);

      resetForm();
      loadRooms();      
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
    handleSubmit, handleEditSubmit, handleEdit, handleDeleteMeeting, confirmDeleteMeeting,
    setFormData, setToast,
  };
};