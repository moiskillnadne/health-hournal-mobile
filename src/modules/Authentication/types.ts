import { InferType } from 'yup';

import {
  SignUpSchema,
  LogInSchema,
  UserSchema,
  RestorePasswordSchema,
  NewPasswordSchema,
  RestoreUsernameSchema,
} from './schemas';

export type TUser = InferType<typeof UserSchema>;
export type SignUpForm = InferType<typeof SignUpSchema>;
export type TLogIn = InferType<typeof LogInSchema>;
export type RestorePasswordForm = InferType<typeof RestorePasswordSchema>;
export type RestoreUsernameForm = InferType<typeof RestoreUsernameSchema>;
export type NewPasswordForm = InferType<typeof NewPasswordSchema>;
