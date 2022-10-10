import { object, string, ref } from 'yup';

const ChangePasswordSchema = object({
  prevPassword: string().required(),
  proposedPassword: string()
    .min(8, 'errors.password.min')
    .matches(/^(?=.*[a-z])/, 'errors.password.not_meeting_requirements')
    .matches(/^(?=.*[A-Z])/, 'errors.password.not_meeting_requirements')
    .matches(/^(?=.*[0-9])/, 'errors.password.not_meeting_requirements')
    .matches(/^\S*$/, 'errors.password.not_meeting_requirements')
    .required(),
  confirmPassword: string()
    .oneOf([ref('proposedPassword'), null], 'errors.password.match')
    .required(),
});

export default ChangePasswordSchema;
