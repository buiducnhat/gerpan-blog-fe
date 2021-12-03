import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthResponseDto, LoginDto, RegisterDto } from '@src/models/auth.model';
import { ErrorDto } from '@src/models/error.model';
import { IUserBasic } from '@src/models/user.model';
import { RootState } from '@src/redux/store';
import { clearToken, setToken } from '@src/utils/token.util';
import { apiLogin, apiMe, apiRegister } from './auth.api';

export interface IAuthenState {
  isAuth: boolean;
  user: IUserBasic | null;

  fetchingGetMe: boolean;
  fetchGetMeMsg: any;

  fetchingLogin: boolean;
  fetchLoginMsg: any;

  fetchingRegister: boolean;
  fetchRegisterMsg: any;

  fetchingChangePassword: boolean;
  fetchChangePasswordMsg: any;

  fetchingUpdateMe: boolean;
  fetchUpdateMeMsg: any;
}

const initialState: IAuthenState = {
  isAuth: false,
  user: null,

  // state for get me
  fetchingGetMe: false,
  fetchGetMeMsg: null,

  // state for login reducer
  fetchingLogin: false,
  fetchLoginMsg: null,

  // state for register reducer
  fetchingRegister: false,
  fetchRegisterMsg: null,

  // state for changePassword reducer
  fetchingChangePassword: false,
  fetchChangePasswordMsg: null,

  // state for update info reducer
  fetchingUpdateMe: false,
  fetchUpdateMeMsg: null
};

const handleError = (err: any, { rejectWithValue }: { rejectWithValue: any }) => {
  let error: AxiosError<ErrorDto> = err;
  if (!error.response) {
    throw err;
  }
  return rejectWithValue(error.response.data);
};

export const fetchGetMe = createAsyncThunk<IUserBasic>('auth/fetchGetMe', async () => {
  const response = await apiMe();
  return response.data;
});

export const fetchLogin = createAsyncThunk<AuthResponseDto, LoginDto>(
  'auth/fetchLogin',
  async (loginDto, { rejectWithValue }) => {
    try {
      const response = await apiLogin(loginDto);

      return response.data;
    } catch (err: any) {
      // let error: AxiosError<ErrorDto> = err;
      // if (!error.response) {
      //   throw err;
      // }
      // return rejectWithValue(error.response.data);
      return handleError(err, { rejectWithValue });
    }
  }
);

export const fetchRegister = createAsyncThunk<AuthResponseDto, RegisterDto>(
  'auth/fetchRegister',
  async (registerDto, { rejectWithValue }) => {
    try {
      const response = await apiRegister(registerDto);

      return response.data;
    } catch (err: any) {
      let error: AxiosError<ErrorDto> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      clearToken();
      state.isAuth = false;
      state.user = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get user information
      .addCase(fetchGetMe.rejected, (state) => {
        state.isAuth = false;
        state.fetchingGetMe = false;
        state.user = null;
      })
      .addCase(fetchGetMe.pending, (state) => {
        state.fetchingGetMe = true;
      })
      .addCase(fetchGetMe.fulfilled, (state, action) => {
        state.fetchingGetMe = false;
        state.isAuth = true;
        state.user = action.payload;
      })

      // Handle fetch login
      .addCase(fetchLogin.rejected, (state, action) => {
        const error = action.payload as ErrorDto;
        state.isAuth = false;
        state.user = null;
        state.fetchingLogin = false;
        state.fetchLoginMsg = error?.message || action.error.message;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.fetchingLogin = true;
        state.fetchLoginMsg = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        setToken(action.payload.token);
        state.isAuth = true;
        state.fetchingLogin = false;
        state.fetchLoginMsg = null;
        state.user = action.payload.user;
      })

      // Handle fetch register
      .addCase(fetchRegister.rejected, (state, action) => {
        const error = action.payload as ErrorDto;
        state.isAuth = false;
        state.user = null;
        state.fetchingRegister = false;
        state.fetchRegisterMsg = error?.message || action.error.message;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.fetchingRegister = true;
        state.fetchRegisterMsg = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        setToken(action.payload.token);
        state.isAuth = true;
        state.fetchingRegister = false;
        state.fetchRegisterMsg = null;
        state.user = action.payload.user;
      });
  }
});

export const { logout } = authSlice.actions;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
