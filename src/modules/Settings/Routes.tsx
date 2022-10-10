import { Route, Routes } from 'react-router-native';

import { OpenSourceUsed } from '@app/screens';

import {
  Settings,
  AccountDetails,
  Localization,
  Notifications,
  Help,
  Security,
  Subscription,
} from './screens';
import { useFetchNotificationsSettingsQuery } from './hooks';

export default function () {
  useFetchNotificationsSettingsQuery();

  return (
    <Routes>
      <Route index element={<Settings />} />
      <Route path="account-details" element={<AccountDetails />} />
      <Route path="localization" element={<Localization />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="security" element={<Security />} />
      <Route path="help" element={<Help />} />
      <Route path="subscription-management" element={<Subscription />} />
      <Route path="licenses" element={<OpenSourceUsed />} />
    </Routes>
  );
}
