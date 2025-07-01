import { useState } from 'react';

export const useModals = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const [meetingToDelete, setMeetingToDelete] = useState(null);

  return {
    showModal,
    setShowModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    selectedMeetingId,
    setSelectedMeetingId,
    editingMeetingId,
    setEditingMeetingId,
    meetingToDelete,
    setMeetingToDelete
  };
};