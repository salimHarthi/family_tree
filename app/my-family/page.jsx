'use client';
import React from 'react';
import AddFamilyForm from '@/components/addFamilyForm';
import { useGetMyFamily } from '@/dataProvider/hooks';
import FamilyCard from '@/components/familyCard';
const Page = () => {
  const { data, error, isLoading } = useGetMyFamily();
  console.log(data);
  return (
    <div className='flex items-center justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto'>
        {data?.map((item) => (
          <FamilyCard
            name={item?.familyName}
            id={item?._id}
            logo={item?.logo}
            edit={true}
          />
        ))}

        <AddFamilyForm />
      </div>
    </div>
  );
};

export default Page;
