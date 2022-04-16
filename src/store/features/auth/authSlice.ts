import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import api from '../api/apiSlice';

const accessKey = '_rc_access';

type AuthState = {
  token: string | null;
  isAuth: boolean;
};

const token = localStorage.getItem(accessKey);
const isAuth = !!token;

const initialState: AuthState = {
  token,
  isAuth,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      localStorage.setItem(accessKey, payload.token);
      state.token = payload.token;
      state.isAuth = true;
    });
  },
});

export const selectAuthState = (state: RootState) => state.auth;
export const selectAuthToken = createSelector(selectAuthState, (authState) => authState.token);
export const selectIsAuth = createSelector(selectAuthState, (authState) => authState.isAuth);

export default authSlice.reducer;
