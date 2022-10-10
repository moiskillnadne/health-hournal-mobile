import { object, string, ref } from 'yup';

const UserSchema = object({
  firstName: string().required(),
  lastName: string().optional(),
  companyCode: string(),
  email: string().email('errors.email').required(),
  repeatEmail: string().when(['$userEmail', 'email'], {
    is: (userEmail: string, email: string) => userEmail !== email,
    then: schema => schema.oneOf([ref('email'), null], 'errors.emails_match').required(),
  }),
  country: string().required(),
  state: string().required(),
  city: string().required(),
});

export default UserSchema;
