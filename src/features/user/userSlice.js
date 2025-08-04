import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, addUser, deleteUser, getRoles, updateUser } from '../../api/userService';

// Async Thunks
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const res = await getUsers();
  return res.data;
});

export const fetchRoles = createAsyncThunk('user/fetchRoles', async () => {
  const res = await getRoles();
  return res.data;
});

export const createUser = createAsyncThunk('user/createUser', async (data, { rejectWithValue }) => {
  try {
    await addUser(data);
    const res = await getUsers(); // refresh list
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Kullanıcı eklenemedi');
  }
});

export const removeUser = createAsyncThunk('user/removeUser', async (id, { rejectWithValue }) => {
  try {
    await deleteUser(id);
    const res = await getUsers();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Silme başarısız');
  }
});

export const editUser = createAsyncThunk('user/editUser', async ({ id, data }, { rejectWithValue }) => {
  try {
    await updateUser(id, data);
    const res = await getUsers();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Güncelleme başarısız');
  }
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    roles: [],
    loading: false,
    error: null,
    // UI state
    showModal: false,
    showEditModal: false,
    showDeleteModal: false,
    editingUser: null,
    userToDelete: null,
    toast: { show: false, message: '', variant: 'info' },
    // Form state
    formData: {
      username: '', 
      firstname: '', 
      lastname: '', 
      gsm: '', 
      email: '', 
      password: '', 
      role_type: ''
    },
    validationErrors: {},
  },
  reducers: {
    // UI Actions
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setShowEditModal: (state, action) => {
      state.showEditModal = action.payload;
    },
    setShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    setEditingUser: (state, action) => {
      state.editingUser = action.payload;
    },
    setUserToDelete: (state, action) => {
      state.userToDelete = action.payload;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    // Form Actions
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetForm: (state) => {
      state.formData = {
        username: '', 
        firstname: '', 
        lastname: '', 
        gsm: '', 
        email: '', 
        password: '', 
        role_type: ''
      };
      state.validationErrors = {};
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
    .addCase(removeUser.fulfilled, (state, action) => {
    state.users = action.payload;
    }).addCase(createUser.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(editUser.fulfilled, (state, action) => {
      state.users = action.payload;
    }).addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addCase(fetchRoles.rejected, (state, action) => {
      state.error = action.payload;
    })
    .addMatcher(
    (action) => action.type.startsWith('user/') && action.type.endsWith('/pending'),
    (state) => {
    state.loading = true;
    state.error = null;
    }
     )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('user/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

// Export actions
export const { 
  setShowModal, 
  setShowEditModal, 
  setShowDeleteModal, 
  setEditingUser, 
  setUserToDelete, 
  setToast, 
  setFormData, 
  setValidationErrors, 
  resetForm, 
  clearError 
} = userSlice.actions;

export default userSlice.reducer;
