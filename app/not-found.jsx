'use client';
import React from 'react';
import { Button, Result, Row } from 'antd';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <Row style={{ height: '100%' }} justify='center' align='middle'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='default' onClick={() => router.push('/')}>
            Back Home
          </Button>
        }
      />
    </Row>
  );
};

export default NotFoundPage;
