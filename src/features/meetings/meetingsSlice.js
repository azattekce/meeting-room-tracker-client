// src/features/meetings/meetingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMeetings, AddMeeting, addParticipant } from '../../api/meetingService';
import { getRooms } from '../../api/roomService';
import { getUsers } from '../../api/userService';

// Async Thunks
export const fetchMeetings = createAsyncThunk('meetings/fetchMeetings', async () => {
  const res = await getMeetings();
  return res.data;
});

export const fetchRooms = createAsyncThunk('meetings/fetchRooms', async () => {
  const res = await getRooms();
  return res.data;
});

export const fetchUsers = createAsyncThunk('meetings/fetchUsers', async () => {
  const res = await getUsers();
  return res.data;
});

export const addMeeting = createAsyncThunk(
  'meetings/addMeeting',
  async ({ meetingData, participants }, { rejectWithValue }) => {
    try {
      // Create the meeting
      const meetingRes = await addMeeting(meetingData);
      const meetingId = meetingRes.data.meeting_id;
      
      // Add participants
      await Promise.all(participants.map(userId =>
        addParticipant(meetingId, {
          meeting_id: meetingId,
          user_id: userId,
          status: 'invited'
        })
      ));
      
      // Fetch updated meetings
      const res = await getMeetings();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Toplantı oluşturulamadı');
    }
  }
);

// Slice
const meetingsSlice = createSlice({
  name: 'meetings',
  initialState: {
    meetings: [],
    rooms: [],
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch meetings
      .addCase(fetchMeetings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.meetings = action.payload;
        state.loading = false;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      
      // Fetch rooms
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      
      // Fetch users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      
      // Add meeting
      .addCase(addMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeeting.fulfilled, (state, action) => {
        state.meetings = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addMeeting.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default meetingsSlice.reducer;