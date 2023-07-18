import { Schema, model, models } from 'mongoose';

const UsersSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  password: { type: String },
  // username: {
  //   type: String,
  //   required: [true, 'Username is required!'],
  // },
  friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }],

  image: {
    type: String,
  },
});

const Users = models?.Users || model('Users', UsersSchema);

export default Users;
