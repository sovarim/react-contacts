import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import api from './features/api/apiSlice';
import auth, { logout } from './features/auth/authSlice';

const rootReducer = combineReducers({
  auth,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: (state, action) => {
    if (logout.match(action)) {
      return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
  },
  middleware: (gDM) => gDM().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
