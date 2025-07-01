// src/auth/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./authService";

// Async Thunks
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, thunkAPI) => {
  try {
    const response = await authService.getMe();
    console.log("User roles:", response.data.roles);

    return {
      user: response.data.user,
      roles: response.data.roles || [],
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Kullanıcı bilgisi alınamadı");
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await authService.login(formData);

    // Giriş başarılıysa kullanıcı bilgilerini tekrar getir
    await thunkAPI.dispatch(fetchUser());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Giriş başarısız. " + error.message);
  }
});

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const response = await authService.getMe();
    
    return {
      user: response.data.user,
      roles: response.data.roles || [],
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Kullanıcı bilgisi alınamadı");
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    await authService.logout();
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue("Çıkış başarısız.");
  }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (data, thunkAPI) => {
  try {
    const response = await authService.register(data);
    await thunkAPI.dispatch(fetchUser());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.detail || "Kayıt başarısız.");
  }
});

export const refreshAuthToken = createAsyncThunk("auth/refreshToken", async (_, thunkAPI) => {
  try {
    const response = await authService.refreshToken();
    await thunkAPI.dispatch(fetchUser()); // refresh sonrası bilgileri güncelle
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Oturum yenileme başarısız.");
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.roles = [];
        state.error = action.payload;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
            })
      // refreshToken
      .addCase(refreshAuthToken.pending, (state) => {
      state.loading = true;
      })
      .addCase(refreshAuthToken.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.roles = [];
        state.error = null;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
