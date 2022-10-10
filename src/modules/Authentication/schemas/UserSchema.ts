import { object, string } from 'yup';

const UserSchema = object({
  username: string().required(),
  email: string().email('errors.email').required(),
});

export default UserSchema;
