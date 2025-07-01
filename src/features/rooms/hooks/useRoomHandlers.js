// src/features/room/hooks/useRoomHandlers.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRoom, editRoom, removeRoom } from '../roomsSlice';

export const useRoomHandlers = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    room_name: '',
    location: '',
    capacity: '',
    room_type: '',
    created_by: ''
  });
  
  const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(createRoom(formData)).unwrap();
      setShowModal(false);
      setFormData({
        room_name: '',
        location: '',
        capacity: '',
        room_type: '',
        created_by: ''
      });
      setToast({ show: true, message: 'Oda başarıyla eklendi!', variant: 'success' });
    } catch (error) {
      setToast({ 
        show: true, 
        message: error || 'Oda eklenirken bir hata oluştu!', 
        variant: 'danger' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      room_name: room.room_name,
      location: room.location,
      capacity: room.capacity,
      room_type: room.room_type,
      created_by: room.created_by
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(editRoom({ id: editingRoom.room_id, data: formData })).unwrap();
      setShowEditModal(false);
      setToast({ show: true, message: 'Oda başarıyla güncellendi!', variant: 'success' });
    } catch (error) {
      setToast({ 
        show: true, 
        message: error || 'Oda güncellenirken bir hata oluştu!', 
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
    setLoading(true);
    try {
      await dispatch(removeRoom(roomToDelete)).unwrap();
      setToast({ show: true, message: 'Oda başarıyla silindi!', variant: 'success' });
    } catch (error) {
      setToast({ 
        show: true, 
        message: error || 'Oda silinirken bir hata oluştu!', 
        variant: 'danger' 
      });
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setRoomToDelete(null);
    }
  };

  return {
    formData,
    setFormData,
    toast,
    setToast,
    showModal,
    setShowModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    loading,
    editingRoom,
    roomToDelete,
    handleSubmit,
    handleEdit,
    handleEditSubmit,
    handleDelete,
    confirmDelete
  };
};