import { signJwtAccessToken } from './jwt';
import Users from '@/models/user';
import { connectToDB } from '@/util/database';
import * as bcrypt from 'bcrypt';

export const login = async (email, password) => {
  try {
    await connectToDB();

    const user = await Users.findOne({ email: email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const { password, ...userWithoutPass } = user;
        return { userId: user._id, image: user.image };
      }
      return null;
    } else {
      const newUser = await Users.create({
        email: email,
        password: bcrypt.hashSync(password, 10),
      });
      return { userId: newUser._id, image: newUser.image };
    }
  } catch (error) {
    return null;
  }
};

export const signin = async (profile, account) => {
  try {
    await connectToDB();
    if (account?.provider === 'domain-login') {
      return true;
    }
    // check if user already exists
    const userExists = await Users.findOne({ email: profile.email });
    // if not, create a new document and save user in MongoDB
    if (!userExists) {
      await Users.create({
        email: profile.email,
        image: profile.picture,
      });
    }

    return true;
  } catch (error) {
    console.log('Error checking if user exists: ', error.message);
    return false;
  }
};

export const getUserInfo = async (profile) => {
  await connectToDB();
  const user = await Users.findOne({ email: profile.email });
  if (user) {
    return { userId: user._id, image: user.image };
  }
  return null;
};
