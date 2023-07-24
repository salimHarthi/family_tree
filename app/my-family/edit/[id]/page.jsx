'use client';
import { Col, Row } from 'antd';
import EditFlowPage from '@/components/editFlowPage';
import AddPersonForm from '@/components/addPersonForm';
import { ReactFlowProvider } from 'reactflow';
const EditFamily = ({ params }) => {
  return (
    <ReactFlowProvider>
      <Row className='h-full'>
        <Col>
          <AddPersonForm id={params?.id} />
        </Col>
        <Col flex={24}>
          <EditFlowPage id={params?.id} />
        </Col>
      </Row>
    </ReactFlowProvider>
  );
};

export default EditFamily;
