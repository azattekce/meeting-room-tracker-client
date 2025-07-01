// hooks/useUserHandlers.js
import { useState } from 'react';
import { useUserApi } from './useUserApi';
import { useUserForm } from './useUserForm';
import { useModals } from './useModals';

export const useUserHandlers = () => {
  
  const {
    users, setUsers, roles, setRoles,
    loadUsers, loadRoles,
    addUser, updateUser, deleteUser
  } = useUserApi();

  const {
    formData, setFormData,
    validationErrors, setValidationErrors,
    validateForm, resetForm
  } = useUserForm();

  const {
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    editingUser, setEditingUser,
    userToDelete, setUserToDelete
  } = useModals();

  const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });
  const [loading, setLoading] = useState(false);

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
      await addUser(formData);
      resetForm();
      setShowModal(false);
      loadUsers();
      setToast({ show: true, message: 'Kullanıcı başarıyla eklendi!', variant: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.detail || 'Hata oluştu!', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user });
    setShowEditModal(true);
  };

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
      await updateUser(editingUser.user_id, formData);
      loadUsers();
      setShowEditModal(false);
      setToast({ show: true, message: 'Kullanıcı güncellendi!', variant: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.detail || 'Hata oluştu!', variant: 'danger' });
    } finally {
      setLoading(false);
      setEditingUser(null);
    }
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete);
      loadUsers();
      setToast({ show: true, message: 'Kullanıcı silindi!', variant: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.detail || 'Hata oluştu!', variant: 'danger' });
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  return {
    users, roles, formData, validationErrors,
    showModal, showEditModal, showDeleteModal,
    toast, loading, editingUser, userToDelete,
    setShowModal, setShowEditModal, setShowDeleteModal,
    handleSubmit, handleEditSubmit, handleEdit, handleDelete, confirmDelete,
    setFormData, setToast,
  };
};
