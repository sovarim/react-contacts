import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse } from './types';
// import { RootState } from 'store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8001/',
  // prepareHeaders: (headers, { getState }) => {
  //   const { token } = (getState() as RootState).auth;
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

const api = createApi({
  baseQuery,
  reducerPath: 'api',
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        body,
        url: 'auth',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation } = api;

export default api;
