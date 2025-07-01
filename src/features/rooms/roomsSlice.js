// src/features/rooms/roomsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRooms, addRoom, updateRoom, deleteRoom } from '../../api/roomService';

// Async Thunks
export const fetchRooms = createAsyncThunk('room/fetchRooms', async () => {
  const res = await getRooms();
  return res.data;
});

export const createRoom = createAsyncThunk('room/createRoom', async (data, { rejectWithValue }) => {
  try {
    await addRoom(data);
    const res = await getRooms(); // refresh list
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Oda eklenemedi');
  }
});

export const editRoom = createAsyncThunk('room/editRoom', async ({ id, data }, { rejectWithValue }) => {
  try {
    await updateRoom(id, data);
    const res = await getRooms();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Güncelleme başarısız');
  }
});

export const removeRoom = createAsyncThunk('room/removeRoom', async (id, { rejectWithValue }) => {
  try {
    await deleteRoom(id);
    const res = await getRooms();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Silme başarısız');
  }
});

// Slice
const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(editRoom.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(removeRoom.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('room/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('room/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('room/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export default roomsSlice.reducer;