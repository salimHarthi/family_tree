'use client';
import { Button, Result, Row } from 'antd';
import { useRouter } from 'next/navigation';
export default function Error({ error, reset }) {
  const router = useRouter();
  return (
    <Row style={{ height: '100%' }} justify='center' align='middle'>
      <Result
        status='500'
        title='500'
        subTitle='Sorry, something went wrong.'
        extra={
          <>
            <Button type='default' onClick={reset}>
              Try again
            </Button>
            <Button type='default' onClick={() => router.push('/')}>
              Back Home
            </Button>
          </>
        }
      />
    </Row>
  );
}
