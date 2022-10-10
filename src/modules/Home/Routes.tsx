import { Route, Routes } from 'react-router-native';

import { Home } from './screens';

export default function () {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}
