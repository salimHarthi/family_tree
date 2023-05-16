import Families from '@/models/family';
import { connectToDB } from '@/util/database';

export const getAllFamiles = async () => {
  await connectToDB();
  const families = await Families.find({ isPublic: true });

  return families;
};
