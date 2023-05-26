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
      'users.userId': token.userId,
    }).select(['familyName', 'isPublic', 'logo']);
    if (!families) {
      return new Response({ status: 404 });
    }
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
