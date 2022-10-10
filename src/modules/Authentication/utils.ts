import { SerializedError, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

import { CustomFetchBaseQueryError } from '@app/types';
import { selectCurrentUser, RootState, systemApi, clear } from '@app/state';
import { getFCMToken } from '@features/Notifications';
import { customerLogout } from '@features/Purchases';

export function isWrongPasswordOrEmailError(error: CustomFetchBaseQueryError | SerializedError) {
  return 'data' in error && error.data.code === 'INVALID_USER_CREDENTIALS';
}

export function isLinkExpiredError(error: CustomFetchBaseQueryError | SerializedError) {
  return 'data' in error && error.data.code === 'LINK_EXPIRED';
}

export function isInvalidConfirmCodeError(error: CustomFetchBaseQueryError | SerializedError) {
  return 'data' in error && error.data.code === 'INVALID_CONFIRM_CODE';
}

type CleanUpUserDataIfOptions = {
  dispatch: ThunkDispatch<RootState, any, AnyAction>;
  state: RootState;
};

export async function cleanUpUserDataIf(
  condition: () => boolean,
  { dispatch, state }: CleanUpUserDataIfOptions,
) {
  const user = selectCurrentUser(state);

  if (user?.token && condition()) {
    const fcmToken = await getFCMToken();

    dispatch(clear());
    dispatch(systemApi.util.resetApiState());
    dispatch(systemApi.endpoints.removeFCMToken.initiate({ fcmToken, userToken: user.token }));
  }
}
