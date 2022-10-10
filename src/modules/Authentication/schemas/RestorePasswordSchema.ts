import UserSchema from './UserSchema';

const RestorePassword = UserSchema.pick(['email']);

export default RestorePassword;
