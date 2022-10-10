import UserSchema from './UserSchema';

const RestoreUsernameSchema = UserSchema.pick(['email']);

export default RestoreUsernameSchema;
