import { connectToDB } from '@/seed/seed';
export const GET = async (req) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await connectToDB();
      return new Response('done', { status: 500 });
    } else {
      throw new Error('not alowed in prod');
    }
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
