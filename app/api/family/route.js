import Families from '@/models/family';
import { connectToDB } from '@/util/database';
import { getToken } from 'next-auth/jwt';

export const GET = async (req) => {
  try {
    await connectToDB();

    const families = await Families.find({ isPublic: true });
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export const POST = async (req) => {
  //TODO: make limt to 3 families only
  try {
    await connectToDB();
    const token = await getToken({ req });
    if (!token) {
      return new Response({}, { status: 401 });
    }
    const { familyName, logo, isPublic } = await req.json();
    const families = await Families.create({
      familyName: familyName,
      logo: logo,
      isPublic: isPublic,
      users: [{ userId: token.userId, role: ['edit', 'view'] }],
    });
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
