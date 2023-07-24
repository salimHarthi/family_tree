import Families from '@/models/family';
import { connectToDB } from '@/util/database';
import { getToken } from 'next-auth/jwt';

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const token = await getToken({ req });
    if (!token) {
      return new Response({}, { status: 401 });
    }
    const families = await Families.findOneAndDelete({
      _id: params?.id,
      creator: token.userId,
    });

    return new Response(JSON.stringify({ id: params?.id }), {
      status: 200,
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
