import { useLocation } from 'react-router-native';

import { useAppSelector } from '@app/hooks';
import { ErrorAlert } from '@app/components';
import { selectAccessToken } from '@app/state';

import { useResendVerificationCodeMutation } from '../hooks';

import EmailFailed from './EmailFailed';

type LocationState =
  | {
      accessToken: string;
      idToken: string;
    }
  | undefined;

function EmailChangeFailed() {
  const locationState = useLocation().state as LocationState;

  const accessToken = useAppSelector(selectAccessToken) ?? '';

  const [resendCode, { error }] = useResendVerificationCodeMutation();

  function submit() {
    resendCode({
      attribute: 'email',
      accessCode: locationState?.accessToken ? locationState.accessToken : accessToken,
      idToken: locationState?.idToken ? locationState.idToken : undefined,
    });
  }

  return (
    <>
      <EmailFailed onSendAgain={submit} />

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </>
  );
}

export default EmailChangeFailed;
