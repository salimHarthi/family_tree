import { Button, DatePicker, Form, Input } from 'antd';
import UploadAvatar from './uploadAvatar';
import { useReactFlow } from 'reactflow';
import { getLayoutedElements } from '@/util/flowUtil';
import { v4 as uuidv4 } from 'uuid';
const AddPersonForm = () => {
  const { setNodes, getEdges, getNodes } = useReactFlow();
  const onFinish = (value) => {
    console.log(value);
    let nodes = getNodes();
    let edges = getEdges();
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      [
        ...nodes,
        {
          id: uuidv4(),
          type: 'imageNode',
          data: { birthday: '1995/2/2', name: value.firstName },
        },
      ],
      edges
    );

    setNodes([...layoutedNodes]);
  };

  return (
    <Form
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout='horizontal'
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label='First Name'
        name='firstName'
        rules={[
          {
            required: true,
            message: 'Please enter First Name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='last Name'
        name='lastName'
        rules={[
          {
            required: true,
            message: 'Please enter last Name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='Date of birth' name='birthDay'>
        <DatePicker />
      </Form.Item>
      <Form.Item label='Upload'>
        <UploadAvatar />
      </Form.Item>
      <Form.Item label='Button'>
        <Button type='primary' htmlType='submit'>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddPersonForm;
