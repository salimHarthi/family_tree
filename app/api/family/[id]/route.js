import Families from '@/models/family';
import { connectToDB } from '@/util/database';

export const PUT = async (req, { params }) => {
  try {
    await connectToDB();
    let data = await req.json();
    const families = await Families.findOneAndUpdate(
      { _id: params?.id },
      {
        ...data,
      }
    );
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const families = await Families.findOne({ _id: params?.id });
    if (!families) {
      return new Response({ status: 404 });
    }
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
