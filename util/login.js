import { signJwtAccessToken } from './jwt';
import Users from '@/models/user';
import { connectToDB } from '@/util/database';
import * as bcrypt from 'bcrypt';

export const login = async (email, password) => {
  await connectToDB();

  const user = await Users.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...userWithoutPass } = user;
    // const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
    };
    return result;
  }
  return null;
};
