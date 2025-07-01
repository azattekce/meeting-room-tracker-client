import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/auth/authSlice';
import roomsReducer from '../features/rooms/roomsSlice';
import meetingsReducer from '../features/meetings/meetingsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    rooms: roomsReducer,
    meetings: meetingsReducer
    // diğer slice'lar burada olabilir,
   
  },
});

export default store;
