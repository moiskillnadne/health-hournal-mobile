import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-native';

import { Inactivity } from '@app/components';
import { useAuth, useAppDispatch } from '@app/hooks';
import { logoff } from '@app/state/actions';

const MINUTE = 60 * 1000;
const ACTIVITY_TIMEOUT = 15 * MINUTE;

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!isAuthenticated) return <Navigate to="/public" state={{ from: location }} replace />;

  function onUserInactivity(isActive: boolean) {
    if (!isActive) {
      dispatch(logoff());
      navigate('/public/login');
    }
  }

  return (
    <Inactivity timeForInactivity={ACTIVITY_TIMEOUT} onAction={onUserInactivity}>
      <Outlet />
    </Inactivity>
  );
}

export default ProtectedRoute;
