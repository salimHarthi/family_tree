export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const families = await Families.find({ 'users.userId': 'id' });
    if (!families) {
      return new Response({ status: 404 });
    }
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
