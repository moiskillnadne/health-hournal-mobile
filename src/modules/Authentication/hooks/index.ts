import { api } from '../state';

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useRefreshMutation,
  useConfirmEmailMutation,
  useRestorePasswordMutation,
  useConfirmNewPasswordMutation,
  useResendConfirmationCodeMutation,
  useVerifyChangedPasswordMutation,
  useResendVerificationCodeMutation,
  useRestoreUsernameMutation,
} = api;

export { default as useTranslate } from './useTranslate';
