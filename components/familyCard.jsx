import Image from 'next/image';
import { cardWidth } from '@/constent';
import Link from 'next/link';

const FamilyCard = ({ name, logo, id }) => {
  return (
    <Link
      style={{ width: cardWidth }}
      href={{
        pathname: `/family/view/${id}`,
      }}
    >
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <Image
          style={{ maxHeight: 320, maxWidth: 240 }}
          src={logo}
          width={240}
          height={320}
          alt='Picture of the author'
        />
        <div className='p-5 text-center'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default FamilyCard;
