import { useLocation } from 'react-router-native';

import { ErrorAlert } from '@app/components';

import { useResendConfirmationCodeMutation } from '../hooks';

import EmailFailed from './EmailFailed';

type LocationState =
  | {
      username: string;
    }
  | undefined;

function EmailConfirmationFailed() {
  const locationState = useLocation().state as LocationState;

  const [resend, { error }] = useResendConfirmationCodeMutation();

  function submit() {
    if (locationState?.username) {
      resend({ username: locationState.username });
    }
  }

  return (
    <>
      <EmailFailed onSendAgain={submit} />

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </>
  );
}

export default EmailConfirmationFailed;
