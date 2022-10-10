import { Routes, Route, Navigate } from 'react-router-native';

import { useCheckFirstLaunch } from './hooks';

function DefaultRoute() {
  const { launched } = useCheckFirstLaunch();

  return (
    <Routes>
      {launched == null && <Route index element={<></>} />}

      {!launched && launched != null && (
        <Route index element={<Navigate to="public/onboarding" replace />} />
      )}

      {launched && <Route index element={<Navigate to="public" replace />} />}
    </Routes>
  );
}

export default DefaultRoute;
