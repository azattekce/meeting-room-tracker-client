import { useState, useEffect } from 'react';
import { 
  getMeetings,
  addMeeting, 
  updateMeeting, 
  deleteMeeting 
} from '../../../api/meetingService';
import { getRooms } from '../../../api/roomService';
import { getUsers } from '../../../api/userService';

export const useMeetingsApi = () => {
  const [meetings, setMeetings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMeetings = async () => {
    setLoading(true);
    try {
      const res = await getMeetings();
      setMeetings(res.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  };

  const loadRooms = async () => {
    try {
      const res = await getRooms();
      setRooms(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch rooms');
    }
  };

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    }
  };

  useEffect(() => {
    loadMeetings();
    loadRooms();
    loadUsers();
  }, []);

  return {
    meetings, setMeetings,
    rooms, setRooms,
    users, setUsers,
    loading, error,
    loadMeetings, loadRooms, loadUsers,
    addMeeting, updateMeeting, deleteMeeting
  };
};