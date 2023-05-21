'use client';
import React, { useState } from 'react';
import AddFamilyForm from '@/components/addFamilyForm';
import { useGetMyFamily, useDeleteFamily } from '@/dataProvider/hooks';
import FamilyCard from '@/components/familyCard';
import EditFamilyInfo from '@/components/editFamilyInfo';
const Page = () => {
  const { data, error, isLoading } = useGetMyFamily();
  const { trigger, isMutating } = useDeleteFamily();
  return (
    <div className='flex items-center justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto'>
        {data?.map((item) => (
          <FamilyCard
            name={item?.familyName}
            id={item?._id}
            logo={item?.logo}
            edit={true}
            onDelete={trigger}
            onEdit={<EditFamilyInfo data={item} />}
          />
        ))}

        <AddFamilyForm />
      </div>
    </div>
  );
};

export default Page;
