import Families from '@/models/family';
import { connectToDB } from '@/util/database';

// export const PUT = async (req) => {
//   try {
//     await connectToDB();
//     const { familyName, logo, isPublic, } = await req.json();
//     const Families = await Family.findOneAndUpdate({

//     });
//     return new Response(JSON.stringify(Families), { status: 200 });
//   } catch (error) {
//     return new Response('Failed to fetch', { status: 500 });
//   }
// };

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const families = await Families.findById(params?.id);
    if (!families) {
      return new Response({ status: 404 });
    }
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
