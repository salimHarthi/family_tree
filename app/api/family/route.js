import Families from '@/models/family';
import { connectToDB } from '@/util/database';

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
  try {
    await connectToDB();
    const { familyName, logo, isPublic } = await req.json();
    const Families = await Families.create({
      familyName: familyName,
      logo: logo,
      isPublic: isPublic,
    });
    return new Response(JSON.stringify(Families), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch', { status: 500 });
  }
};
