import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-native';

import { ErrorAlert } from '@app/components';

import { isInvalidConfirmCodeError } from '../utils';
import { useConfirmEmailMutation } from '../hooks';

function EmailConfirmationRequest() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const username = searchParams.get('username');

  const navigate = useNavigate();

  const [sendCode, { isSuccess: isSuccessfullyConfirmedEmail, error }] = useConfirmEmailMutation();

  useEffect(() => {
    if (code && username) {
      sendCode({ code, username });
    } else {
      navigate('/public');
    }
  }, [code, username, navigate, sendCode]);

  useEffect(() => {
    if (isSuccessfullyConfirmedEmail) {
      navigate('/public/email-confirmed', { state: undefined });
    }
  }, [isSuccessfullyConfirmedEmail, navigate]);

  useEffect(() => {
    if (error && 'data' in error && isInvalidConfirmCodeError(error)) {
      navigate('/public/email-confirmation-failed', { state: { username } });
    }
  }, [error, navigate, username]);

  return <>{error && <ErrorAlert error={error}></ErrorAlert>}</>;
}

export default EmailConfirmationRequest;
