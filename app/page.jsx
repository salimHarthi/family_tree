import React from 'react';
import FamilyCard from '@/components/familyCard';
import { getAllFamiles } from '@/dataProvider/db';
export const revalidate = 18000;
const Home = async () => {
  const data = await getAllFamiles();

  return (
    <div className='flex items-center justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto'>
        {data?.map((item) => (
          <FamilyCard
            name={item?.familyName}
            id={item?._id}
            logo={item?.logo}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
