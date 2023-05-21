import Families from '@/models/family';
import { connectToDB } from '@/util/database';
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const families = await Families.findByIdAndDelete(params?.id);

    return new Response(JSON.stringify({ id: params?.id }), {
      status: 200,
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
