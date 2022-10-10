import { string } from 'yup';

import UserSchema from './UserSchema';

const SignUpSchema = UserSchema.pick(['username']).shape({
  password: string().required(),
});

export default SignUpSchema;
