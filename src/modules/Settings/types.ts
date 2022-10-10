import { InferType } from 'yup';

import { UserSchema, ChangePasswordSchema } from './schemas';

export type UserForm = InferType<typeof UserSchema>;
export type ChangePasswordForm = InferType<typeof ChangePasswordSchema>;
