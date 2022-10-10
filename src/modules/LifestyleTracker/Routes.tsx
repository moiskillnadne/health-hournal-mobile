import { Route, Routes } from 'react-router-native';

import { LifestyleTracker } from './screens';

export default function () {
  return (
    <Routes>
      <Route index element={<LifestyleTracker />}></Route>
    </Routes>
  );
}
