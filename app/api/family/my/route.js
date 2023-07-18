import Families from '@/models/family';
import { connectToDB } from '@/util/database';
import { getToken } from 'next-auth/jwt';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const token = await getToken({ req });
    if (!token) {
      return new Response({}, { status: 401 });
    }

    const families = await Families.find({
      $or: [{ 'users.userId': token.userId }, { creator: token.userId }],
    })
      .select(['familyName', 'isPublic', 'logo', 'creator', 'users'])
      .populate({
        path: 'users.userId',
        select: ['_id', 'email', 'image'],
      });
    if (!families) {
      return new Response({ status: 404 });
    }
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
