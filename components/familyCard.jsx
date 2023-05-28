import Image from 'next/image';
import { cardWidth, cardHeight } from '@/constent';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

const FamilyCard = ({ name, logo, id, onDelete, onEdit, edit = false }) => {
  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <Link
        href={{
          pathname: `${edit ? `/my-family/edit/${id}` : `/family/view/${id}`}`,
        }}
      >
        <Image src={logo} width={240} height={320} alt='logo' />

        <div className='p-5 text-center'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </h5>
        </div>
      </Link>
      {edit ? (
        <div className='flex items-center p-6'>
          <div className='mr-auto'>
            <TrashIcon
              className='block h-8 w-8 cursor-pointer'
              aria-hidden='true'
              onClick={(e) => {
                onDelete({ id: id });
              }}
            />
          </div>
          <div className='ml-auto'>{onEdit}</div>
        </div>
      ) : null}
    </div>
  );
};

export default FamilyCard;
