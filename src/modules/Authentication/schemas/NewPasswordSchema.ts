import { object, string, ref } from 'yup';

const NewPasswordSchema = object({
  password: string()
    .min(8, 'errors.password.min')
    .matches(/^(?=.*[a-z])/, 'errors.password.not_meeting_requirements')
    .matches(/^(?=.*[A-Z])/, 'errors.password.not_meeting_requirements')
    .matches(/^(?=.*[0-9])/, 'errors.password.not_meeting_requirements')
    .matches(/^\S*$/, 'errors.password.not_meeting_requirements')
    .required(),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'errors.password.match')
    .required(),
});

export default NewPasswordSchema;
