import { useCallback } from 'react';
import { useNavigate } from 'react-router-native';

import { logout } from '@app/state';
import { customerLogout } from '@app/features/Purchases';

import useAppDispatch from './useAppDispatch';

function useLogout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useCallback(() => {
    customerLogout();
    navigate('/public/login', { state: null });
    dispatch(logout());
  }, [dispatch, navigate]);
}

export default useLogout;
