import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-native';

import { ErrorAlert } from '@app/components';
import { useAppSelector } from '@app/hooks';
import { selectRefreshToken } from '@app/state';

import { useRefreshMutation, useVerifyChangedPasswordMutation } from '../hooks';
import { isLinkExpiredError } from '../utils';

function EmailConfirmationRequest() {
  const [searchParams] = useSearchParams();
  const refreshToken = useAppSelector(selectRefreshToken);

  const code = searchParams.get('code');

  const navigate = useNavigate();

  const [refresh] = useRefreshMutation();
  const [sendCode, { isSuccess: isSuccessfullyConfirmedEmail, error }] =
    useVerifyChangedPasswordMutation();

  useEffect(() => {
    if (code && refreshToken) {
      refresh({ refreshToken })
        .unwrap()
        .then(({ accessToken, idToken }) => {
          sendCode({ code, accessToken, idToken });
        });
    } else {
      navigate('/public');
    }
  }, [code, navigate, sendCode, refreshToken, refresh]);

  useEffect(() => {
    if (isSuccessfullyConfirmedEmail) {
      navigate('/public/email-confirmed', { state: undefined });
    }
  }, [isSuccessfullyConfirmedEmail, navigate]);

  useEffect(() => {
    if (error && 'data' in error && isLinkExpiredError(error)) {
      navigate('/public/email-change-failed');
    }
  }, [error, navigate]);

  return <>{error && <ErrorAlert error={error}></ErrorAlert>}</>;
}

export default EmailConfirmationRequest;
