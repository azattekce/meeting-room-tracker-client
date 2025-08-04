import { useState } from 'react';

export const useRoomUI = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Toast state - yeni yapı
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  // Eski toast state - backward compatibility
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  const showToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setIsToastVisible(true);
    
    // Eski yapı için de güncelle
    setToast({ show: true, message, variant });
    
    setTimeout(() => {
      setIsToastVisible(false);
      setToast({ show: false, message: '', variant: 'success' });
    }, 3000);
  };

  const closeToast = () => {
    setIsToastVisible(false);
    setToast({ show: false, message: '', variant: 'success' });
  };

  const setShowDeleteModalWithItem = (show, item = null) => {
    setShowDeleteModal(show);
    setSelectedItem(item);
  };

  return {
    showAddModal, setShowAddModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal: setShowDeleteModalWithItem,
    selectedItem, setSelectedItem,
    
    // Yeni yapı
    showToast: isToastVisible,
    toastMessage,
    toastVariant,
    closeToast,
    showToastFunction: showToast,
    
    // Eski yapı - backward compatibility
    toast, setToast
  };
};
