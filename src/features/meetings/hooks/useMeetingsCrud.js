import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetings, fetchRooms, fetchUsers, addMeetingSlice, updateMeetingSlice, removeMeetingSlice } from '../meetingsSlice';

export const useMeetingsCrud = () => {
  const dispatch = useDispatch();
  const { meetings, rooms, users, loading, error } = useSelector(state => state.meetings || {});

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
  };
};
