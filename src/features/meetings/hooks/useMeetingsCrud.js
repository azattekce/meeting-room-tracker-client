import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetings, fetchRooms, fetchUsers, addMeetingSlice, updateMeetingSlice, removeMeetingSlice, fetchParticipants, addParticipantSlice, removeParticipantSlice } from '../meetingsSlice';

export const useMeetingsCrud = () => {
  const dispatch = useDispatch();
  const { meetings, rooms, users, participants, loading, error } = useSelector(state => state.meetings || {});

  const loadMeetings = useCallback(() => dispatch(fetchMeetings()), [dispatch]);
  const loadRooms = useCallback(() => dispatch(fetchRooms()), [dispatch]);
  const loadUsers = useCallback(() => dispatch(fetchUsers()), [dispatch]);

  const addMeeting = async (meetingData, participants = []) => {
    const result = await dispatch(addMeetingSlice({ meetingData, participants }));
    return result;
  };

  const updateMeeting = async (id, meetingData) => {
    const result = await dispatch(updateMeetingSlice({ id, meetingData }));
    return result;
  };

  const deleteMeeting = async (id) => {
    const result = await dispatch(removeMeetingSlice(id));
    return result;
  };

  const loadParticipants = async (meetingId) => {
    const res = await dispatch(fetchParticipants(meetingId));
    return res.payload?.participants || [];
  };

  const addParticipantLocal = async (meetingId, participant) => {
    const res = await dispatch(addParticipantSlice({ meetingId, participant }));
    return res.payload;
  };

  const removeParticipantLocal = async (meetingId, participantId) => {
    const res = await dispatch(removeParticipantSlice({ meetingId, participantId }));
    return res.payload;
  };

  return {
    meetings: meetings || [],
    rooms: rooms || [],
    users: users || [],
    loading: !!loading,
    error,
    loadMeetings,
    loadRooms,
    loadUsers,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    loadParticipants,
    addParticipant: addParticipantLocal,
    removeParticipant: removeParticipantLocal,
    participants: participants || {},
  };
};
