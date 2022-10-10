import { Route, Routes } from 'react-router-native';

import { Notifications } from './screens';

export default function () {
  return (
    <Routes>
      <Route index element={<Notifications />} />
    </Routes>
  );
}
