'use client';
import React from 'react';
import AddFamilyForm from '@/components/addFamilyForm';
import { useGetMyFamily, useDeleteFamily } from '@/dataProvider/hooks';
import FamilyCard from '@/components/familyCard';
import EditFamilyInfo from '@/components/editFamilyInfo';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data, error, isLoading } = useGetMyFamily();
  const { trigger, isMutating } = useDeleteFamily();
  const { data: session } = useSession();
  return (
    <div className='flex items-center justify-center' style={{ marginTop: 20 }}>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto'>
        {data?.map((item) => (
          <FamilyCard
            name={item?.familyName}
            id={item?._id}
            logo={item?.logo}
            edit={item?.creator === session?.user?.userId}
            onDelete={trigger}
            onEdit={<EditFamilyInfo data={item} />}
          />
        ))}

        {data?.length < 3 ? <AddFamilyForm /> : null}
      </div>
    </div>
  );
};

export default Page;
