import Image from 'next/image';
import { cardWidth } from '@/constent';
import Link from 'next/link';

const FamilyCard = ({ name, logo, id }) => {
  return (
    <Link
      href={{
        pathname: '/family/view',
        query: { id: id },
      }}
    >
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <a href='#'>
          <img
            className='rounded-t-lg'
            src='/docs/images/blog/image-1.jpg'
            alt=''
          />
        </a>
        <div className='p-5'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Noteworthy technology acquisitions 2021
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </Link>

    // <Card
    //   style={{
    //     width: cardWidth,
    //   }}
    //   onClick={() => {
    //     router.push(`/family/view/${id}`);
    //   }}
    //   cover={
    //     <Image
    //       style={{ maxHeight: 320, maxWidth: 240 }}
    //       src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    //       width={240}
    //       height={320}
    //       alt='Picture of the author'
    //     />
    //   }
    // >
    //   <Meta className='text-center' title={name} />
    // </Card>
  );
};

export default FamilyCard;
