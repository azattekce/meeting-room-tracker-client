// hooks/useUserHandlers.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchUsers, 
  fetchRoles, 
  createUser, 
  editUser, 
  removeUser,
  setShowModal,
  setShowEditModal,
  setShowDeleteModal,
  setEditingUser,
  setUserToDelete,
  setToast,
  setFormData,
  setValidationErrors,
  resetForm,
  clearError
} from '../userSlice';

export const useUserHandlers = () => {
  const dispatch = useDispatch();
  
  // Redux state'den değerleri al
  const {
    users,
    roles,
    loading,
    error,
    showModal,
    showEditModal,
    showDeleteModal,
    editingUser,
    userToDelete,
    toast,
    formData,
    validationErrors
  } = useSelector(state => state.user);

  // Component mount olduğunda verileri yükle
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  // Validation fonksiyonu
  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Kullanıcı adı zorunludur';
    if (!formData.firstname) errors.firstname = 'Ad zorunludur';
    if (!formData.lastname) errors.lastname = 'Soyad zorunludur';
    if (!formData.gsm) errors.gsm = 'GSM zorunludur';
    if (!formData.email) errors.email = 'E-posta zorunludur';
    if (!formData.role_type) errors.role_type = 'Yetki seçimi zorunludur';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors));
      dispatch(setToast({ show: true, message: 'Lütfen zorunlu alanları doldurunuz!', variant: 'danger' }));
      return;
    }
    
    try {
      await dispatch(createUser(formData)).unwrap();
      dispatch(resetForm());
      dispatch(setShowModal(false));
      dispatch(setToast({ show: true, message: 'Kullanıcı başarıyla eklendi!', variant: 'success' }));
    } catch (error) {
      dispatch(setToast({ show: true, message: error || 'Hata oluştu!', variant: 'danger' }));
    }
  };

  const handleEdit = (user) => {
    dispatch(setEditingUser(user));
    dispatch(setFormData({ ...user }));
    dispatch(setShowEditModal(true));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch(setValidationErrors(errors));
      dispatch(setToast({ show: true, message: 'Eksik alanlar var!', variant: 'danger' }));
      return;
    }
    
    try {
      await dispatch(editUser({ id: editingUser.user_id, data: formData })).unwrap();
      dispatch(setShowEditModal(false));
      dispatch(setEditingUser(null));
      dispatch(setToast({ show: true, message: 'Kullanıcı güncellendi!', variant: 'success' }));
    } catch (error) {
      dispatch(setToast({ show: true, message: error || 'Hata oluştu!', variant: 'danger' }));
    }
  };

  const handleDelete = (id) => {
    dispatch(setUserToDelete(id));
    dispatch(setShowDeleteModal(true));
  };

  const confirmDelete = async () => {
    try {
      await dispatch(removeUser(userToDelete)).unwrap();
      dispatch(setToast({ show: true, message: 'Kullanıcı silindi!', variant: 'success' }));
    } catch (error) {
      dispatch(setToast({ show: true, message: error || 'Hata oluştu!', variant: 'danger' }));
    } finally {
      dispatch(setShowDeleteModal(false));
      dispatch(setUserToDelete(null));
    }
  };

  // Action dispatchers
  const handleSetShowModal = (value) => dispatch(setShowModal(value));
  const handleSetShowEditModal = (value) => dispatch(setShowEditModal(value));
  const handleSetShowDeleteModal = (value) => dispatch(setShowDeleteModal(value));
  const handleSetFormData = (data) => dispatch(setFormData(data));
  const handleSetToast = (toast) => dispatch(setToast(toast));

  return {
    // State
    users, 
    roles, 
    formData, 
    validationErrors,
    showModal, 
    showEditModal, 
    showDeleteModal,
    toast, 
    loading, 
    error,
    editingUser, 
    userToDelete,
    
    // Actions
    setShowModal: handleSetShowModal,
    setShowEditModal: handleSetShowEditModal,
    setShowDeleteModal: handleSetShowDeleteModal,
    setFormData: handleSetFormData,
    setToast: handleSetToast,
    
    // Handlers
    handleSubmit, 
    handleEditSubmit, 
    handleEdit, 
    handleDelete, 
    confirmDelete,
  };
};
