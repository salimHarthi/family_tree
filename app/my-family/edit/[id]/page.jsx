'use client';
import React from 'react';
import { Col, Row } from 'antd';
import EditFlowPage from '@/components/editFlowPage';
import AddPersonForm from '@/components/addPersonForm';
const EditFamily = ({ params }) => {
  return (
    <Row>
      <Col md={4} sm={24}>
        <AddPersonForm id={params?.id} />
      </Col>
      <Col md={20} sm={24}>
        <EditFlowPage id={params?.id} />
      </Col>
    </Row>
  );
};

export default EditFamily;
