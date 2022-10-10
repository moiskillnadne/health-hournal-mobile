import { Route, Routes } from 'react-router-native';

import { ImageBackground } from '@app/components';

import { ReferralQuestionnaire, Welcome } from './screens';

export default function () {
  return (
    <Routes>
      <Route element={<ImageBackground />}>
        <Route index element={<ReferralQuestionnaire />} />
      </Route>
      <Route path="welcome" element={<Welcome />} />
    </Routes>
  );
}
