// hooks/useRoomsHandlers.js
import { useState } from 'react';
import {useRoomsApi}  from './useRoomsApi';
import { useRoomsForm } from './useRoomsForm';
import { useModal } from './useModal';

export const useRoomsHandlers = () => {
  
  const {
    rooms, setRooms,
    loadRooms,
    addRoom, updateRoom, deleteRoom
  } = useRoomsApi();

  const {
    formData, setFormData,
    validationErrors, setValidationErrors,
    validateForm, resetForm
  } = useRoomsForm();

  const {
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    editingRoom, setEditingRoom,
    roomToDelete, setRoomToDelete
  } = useModal();

  const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });
  const [loading, setLoading] = useState(false);

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({ ...room });
    setValidationErrors({}); // Validation hatalarını temizle
    setShowEditModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      console.log("Validation errors:", errors);
      setToast({ show: true, message: 'Lütfen zorunlu alanları doldurunuz!', variant: 'danger' });
      return;
    }

    // Veriyi hazırla
    const roomData = {
      ...formData,
      capacity: parseInt(formData.capacity), // String'i integer'a çevir,
      created_by:parseInt(formData.created_by) // Örnek olarak sistem tarafından oluşturulduğunu varsayıyoruz
    };
    console.log("Sending data to backend:", roomData); // Gönderilen veriyi kontrol edin
    setLoading(true);
    try {
      await addRoom(roomData);
      resetForm();
      setValidationErrors({});
      setShowModal(false);
      loadRooms();
      setToast({ show: true, message: 'Oda başarıyla eklendi!', variant: 'success' });
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // Backend'den gelen hata mesajını işle
      let errorMessage = 'Hata oluştu!';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        console.log('Backend error data type:', typeof errorData);
        console.log('Backend error data:', errorData);
        
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
      
      setToast({ 
        show: true, 
        message: errorMessage, 
        variant: 'danger' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setToast({ show: true, message: 'Eksik alanlar var!', variant: 'danger' });
      return;
    }
    
    // Edit için de capacity'yi integer'a çevir
    const roomData = {
      ...formData,
      capacity: parseInt(formData.capacity)
    };
    
    console.log("Updating room data:", roomData);
    
    setLoading(true);
    try {
      await updateRoom(editingRoom.room_id, roomData);
      loadRooms();
      setValidationErrors({});
      setShowEditModal(false);
      setToast({ show: true, message: 'Oda güncellendi!', variant: 'success' });
    } catch (error) {
      console.error('Error updating room:', error);
      console.error('Error response data:', error.response?.data);
      
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          JSON.stringify(error.response?.data) || 
                          'Hata oluştu!';
      
      setToast({ 
        show: true, 
        message: errorMessage, 
        variant: 'danger' 
      });
    } finally {
      setLoading(false);
      setEditingRoom(null);
    }
  };

  const handleDelete = (id) => {
    setRoomToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRoom(roomToDelete);
      loadRooms();
      setToast({ show: true, message: 'Oda silindi!', variant: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.detail || 'Hata oluştu!', variant: 'danger' });
    } finally {
      setShowDeleteModal(false);
      setRoomToDelete(null);
    }
  };

  return {
    rooms, 
    formData, // Bu undefined olabilir
    validationErrors,
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    toast, setToast,
    loading, 
    editingRoom, 
    roomToDelete,
    handleSubmit, 
    handleEditSubmit, 
    handleEdit, 
    handleDelete, 
    confirmDelete,
    setFormData, // Bu da return edilmeli
    resetForm
  };
};