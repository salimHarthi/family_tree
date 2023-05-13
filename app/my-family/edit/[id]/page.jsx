'use client';
import React from 'react';
import { Col, Row } from 'antd';
import EditFlowPage from '@/components/editFlowPage';
import AddPersonForm from '@/components/addPersonForm';
const EditFamily = () => {
  return (
    <Row>
      <Col md={4} sm={24}>
        <AddPersonForm />
      </Col>
      <Col md={20} sm={24}>
        <EditFlowPage />
      </Col>
    </Row>
  );
};

export default EditFamily;
