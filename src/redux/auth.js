import { toast } from 'react-toastify';

// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { saveLocalstorageAsJson } from '@src/utility/Utils';
import { ErrorToast, SuccessToast } from '../views/components/toasts/Error';
import { removeLocalstorageAsJson } from '../utility/Utils';

const initialUser = () => {
  const item = window.localStorage.getItem('userData');
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

export const handleConnect = createAsyncThunk(
  'auth/handleConnect',
  async ({ userData }) => {
    try {
      saveLocalstorageAsJson('userData', userData);

      window.location.href = '/';

      toast.success(<SuccessToast description="Connected with success " />, {
        icon: false,
        hideProgressBar: true,
      });

      return userData;
    } catch (error) {
      console.error(error);
      toast.error(<ErrorToast description="Error, there was an error " />, {
        icon: false,
        hideProgressBar: true,
      });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: initialUser(),
    isConnected: !!initialUser().address,
    isOpenModal: false,
  },
  reducers: {
    handleLogin: () => {},
    handleLogout: (state) => {
      state.userData = {};
      state.isConnected = false;
      removeLocalstorageAsJson('userData');

      window.location.href = '/';
      toast.success(<SuccessToast description="Disconnected with success " />, {
        icon: false,
        hideProgressBar: true,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleConnect.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isOpenModal = false;
        state.isConnected = true;
      })
      .addCase(handleConnect.pending, (state) => {
        state.isOpenModal = true;
      });
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
