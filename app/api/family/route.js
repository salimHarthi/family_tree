import Family from '@/models/family';
import { connectToDB } from '@/util/database';

export const GET = async (request) => {
  try {
    await connectToDB();

    const Families = await Family.find({ public: true });
    return new Response(JSON.stringify(Families), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch', { status: 500 });
  }
};
