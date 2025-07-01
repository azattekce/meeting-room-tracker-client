// hooks/useModals.js
import { useState } from 'react';

export const useModals = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  return {
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    editingUser, setEditingUser,
    userToDelete, setUserToDelete
  };
};
