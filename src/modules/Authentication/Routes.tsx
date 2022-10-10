import { Route, Routes, Navigate, useLocation, Location } from 'react-router-native';

import {
  SignUp,
  LogIn,
  RestorePassword,
  CheckEmail,
  ThanksForJoin,
  PasswordRecovered,
  EmailConfirmed,
  CreateNewPassword,
  EmailConfirmationRequest,
  EmailChangeConfirmationRequest,
  EmailChangeFailed,
  EmailConfirmationFailed,
  RestoreUsername,
  CheckEmailForUsername,
} from './screens';

const AuthenticationRoutes = () => {
  const locationState = useLocation().state as Maybe<{ from: Location }>;

  return (
    <Routes>
      <Route
        index
        element={<Navigate to="login" state={{ from: locationState?.from }} replace />}
      />

      <Route path="sign-up" element={<SignUp />} />
      <Route path="login" element={<LogIn />} />

      <Route path="check-email" element={<CheckEmail />} />
      <Route path="check-email-for-username" element={<CheckEmailForUsername />} />
      <Route path="thanks-for-join" element={<ThanksForJoin />} />

      <Route path="restore-password" element={<RestorePassword />} />
      <Route path="restore-username" element={<RestoreUsername />} />
      <Route path="create-new-password" element={<CreateNewPassword />} />
      <Route path="password-recovered" element={<PasswordRecovered />} />

      <Route path="email-confirm-request" element={<EmailConfirmationRequest />} />
      <Route path="confirm-email-change" element={<EmailChangeConfirmationRequest />} />
      <Route path="email-change-failed" element={<EmailChangeFailed />} />
      <Route path="email-confirmed" element={<EmailConfirmed />} />
      <Route path="email-confirmation-failed" element={<EmailConfirmationFailed />} />
    </Routes>
  );
};

export default AuthenticationRoutes;
