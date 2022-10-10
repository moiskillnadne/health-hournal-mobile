import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-native';

function useLocationState<T>() {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const clear = useCallback(() => {
    navigate(pathname, { replace: true });
  }, [navigate, pathname]);

  return [state as T | null, clear] as const;
}

export default useLocationState;
