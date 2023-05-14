import Family from '@/models/family';
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
