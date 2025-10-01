// src/features/meetings/meetingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMeetings, addMeeting, addParticipant, updateMeeting, deleteMeeting, getParticipants, deleteParticipant } from '../../api/meetingService';
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

export const addMeetingSlice = createAsyncThunk(
  'meetings/addMeeting',
  async ({ meetingData, participants }, { rejectWithValue }) => {
    try {
      // Create the meeting
      alert('Toplantı oluşturuluyor...');
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

export const fetchParticipants = createAsyncThunk(
  'meetings/fetchParticipants',
  async (meetingId, { rejectWithValue }) => {
    try {
      const res = await getParticipants(meetingId);
      return { meetingId, participants: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Katılımcılar yüklenemedi');
    }
  }
);

export const addParticipantSlice = createAsyncThunk(
  'meetings/addParticipant',
  async ({ meetingId, participant }, { rejectWithValue }) => {
    try {
      const res = await addParticipant(meetingId, participant);
      // return the created participant
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Katılımcı eklenemedi');
    }
  }
);

// If API supports removing a participant
export const removeParticipantSlice = createAsyncThunk(
  'meetings/removeParticipant',
  async ({ meetingId, participantId }, { rejectWithValue }) => {
    try {
      // Assuming there's endpoint delete /meetings/:id/participants/:participantId
      const res = await deleteParticipant(meetingId, participantId);
      return { meetingId, participantId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Katılımcı silinemedi');
    }
  }
);

export const updateMeetingSlice = createAsyncThunk(
  'meetings/updateMeeting',
  async ({ id, meetingData }, { rejectWithValue }) => {
    try {
      await updateMeeting(id, meetingData);
      const res = await getMeetings();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Toplantı güncellenemedi');
    }
  }
);

export const removeMeetingSlice = createAsyncThunk(
  'meetings/removeMeeting',
  async (id, { rejectWithValue }) => {
    try {
      await deleteMeeting(id);
      const res = await getMeetings();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Toplantı silinemedi');
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
    participants: {}, // map meetingId -> participants[]
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
      .addCase(addMeetingSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeetingSlice.fulfilled, (state, action) => {
        state.meetings = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addMeetingSlice.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Update meeting
    builder
      .addCase(updateMeetingSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMeetingSlice.fulfilled, (state, action) => {
        state.meetings = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateMeetingSlice.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Remove meeting
    builder
      .addCase(removeMeetingSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeMeetingSlice.fulfilled, (state, action) => {
        state.meetings = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(removeMeetingSlice.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // Participants
    builder
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        const { meetingId, participants } = action.payload;
        state.participants = state.participants || {};
        state.participants[meetingId] = participants;
      })
      .addCase(addParticipantSlice.fulfilled, (state, action) => {
        const p = action.payload;
        const meetingId = p.meeting_id || p.meetingId;
        state.participants = state.participants || {};
        state.participants[meetingId] = state.participants[meetingId] || [];
        state.participants[meetingId].push(p);
      })
      .addCase(removeParticipantSlice.fulfilled, (state, action) => {
        const { meetingId, participantId } = action.payload;
        if (state.participants && state.participants[meetingId]) {
          state.participants[meetingId] = state.participants[meetingId].filter(p => p.user_id !== participantId && p.id !== participantId);
        }
      });
  }
});

export default meetingsSlice.reducer;