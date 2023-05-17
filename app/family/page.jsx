import React from 'react';
import FamilyCard from '@/components/familyCard';
import { getAllFamiles } from '@/dataProvider/db';
const AllFamilies = async () => {
  const data = await getAllFamiles();

  return (
    <div class='flex items-center justify-center'>
      <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto'>
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

export default AllFamilies;
