import { useAppSelector } from 'store';
import { selectAuthToken, selectIsAuth } from './authSlice';

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const token = useAppSelector(selectAuthToken);

  return {
    isAuth,
    token,
  };
};
