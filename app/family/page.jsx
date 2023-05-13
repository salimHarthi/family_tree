'use client';
import React from 'react';
import { Col, Row } from 'antd';
import FamilyCard from '@/components/familyCard';

const AllFamilies = () => {
  return (
    <Row justify='center' gutter={[20, 20]}>
      <Col>
        <FamilyCard name='test' id='aaaaaaaa' />
      </Col>
      <Col>
        <FamilyCard name='test' />
      </Col>
      <Col>
        <FamilyCard name='test' />
      </Col>
      <Col>
        <FamilyCard name='test' />
      </Col>
      <Col>
        <FamilyCard name='test' />
      </Col>
    </Row>
  );
};

export default AllFamilies;
