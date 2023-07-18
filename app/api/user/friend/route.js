import Users from '@/models/user';
import { connectToDB } from '@/util/database';
import { getToken } from 'next-auth/jwt';

export const GET = async (req) => {
  try {
    await connectToDB();
    const token = await getToken({ req });
    if (!token) {
      return new Response({}, { status: 401 });
    }
    const user = await Users.findById(token.userId).populate({
      path: 'friends',
      select: ['_id', 'email', 'image'],
    });

    return new Response(JSON.stringify(user.friends), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();
    const token = await getToken({ req });
    if (!token) {
      return new Response({}, { status: 401 });
    }
    const { email } = await req.json();
    const frind = await Users.findOne({ email: email });
    const user = await Users.findByIdAndUpdate(
      token.userId,
      {
        $addToSet: { friends: frind._id },
      },
      { new: true }
    ).populate({
      path: 'friends',
      select: ['_id', 'email', 'image'],
    });

    return new Response(JSON.stringify(user.friends), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
