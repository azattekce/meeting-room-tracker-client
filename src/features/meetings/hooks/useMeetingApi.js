import { useState, useEffect } from 'react';
import { 
  getMeetings,
  addMeeting, 
  updateMeeting, 
  deleteMeeting,
  getParticipants,
  addParticipant,
  removeParticipant   
} from '../../../api/meetingService';
import { getRooms } from '../../../api/roomService';
import { getUsers } from '../../../api/userService';

export const useMeetingsApi = () => {
  const [meetings, setMeetings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
 

  const loadMeetings = async () => {
    try {
      const res = await getMeetings();
      setMeetings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadRooms = async () => {
    try {
      const res = await getRooms();
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadUsers = async () => {
    //alert("loadUsers called");
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadParticipants = async (meetingId) => {
    try {
      const res = await getParticipants(meetingId);
      //alert("loadParticipants called with meetingId: " + meetingId);
      setParticipants(res.data);      
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
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
    participants, setParticipants,  
    loadMeetings, loadRooms, loadUsers, loadParticipants,
    addMeeting, updateMeeting, deleteMeeting,
    getParticipants, addParticipant
  };
};