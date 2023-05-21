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
  //TODO: make limt to 3 families only
  try {
    await connectToDB();
    const { familyName, logo, isPublic } = await req.json();
    const families = await Families.create({
      familyName: familyName,
      logo: logo,
      isPublic: isPublic,
      users: [{ userId: 'a666afe7cc34aabdc9f4d87c', role: ['edit', 'view'] }],
    });
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
