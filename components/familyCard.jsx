'use client';
import { Card } from 'antd';
import Image from 'next/image';
import { cardWidth } from '@/constent';
import { useRouter } from 'next/navigation';
const { Meta } = Card;
const FamilyCard = ({ name, logo, id }) => {
  const router = useRouter();
  return (
    <Card
      style={{
        width: cardWidth,
      }}
      onClick={() => {
        router.push(`/family/view/${id}`);
      }}
      cover={
        <Image
          style={{ maxHeight: 320, maxWidth: 240 }}
          src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
          width={240}
          height={320}
          alt='Picture of the author'
        />
      }
    >
      <Meta className='text-center' title={name} />
    </Card>
  );
};

export default FamilyCard;
