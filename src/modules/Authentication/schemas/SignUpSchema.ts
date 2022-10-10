import { string, ref } from 'yup';

import UserSchema from './UserSchema';
import NewPasswordSchema from './NewPasswordSchema';

const SignUpSchema = UserSchema.pick(['username', 'email'])
  .concat(NewPasswordSchema)
  .shape({
    repeatEmail: string()
      .oneOf([ref('email'), null], 'errors.emails_match')
      .required(),
  });

export default SignUpSchema;
