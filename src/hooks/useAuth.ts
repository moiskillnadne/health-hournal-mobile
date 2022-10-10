import { useMemo } from 'react';

import { selectUser, selectIsAuthenticated } from '../state';

import useAppSelector from './useAppSelector';

function useAuth() {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return useMemo(() => ({ user, isAuthenticated }), [user, isAuthenticated]);
}

export default useAuth;
