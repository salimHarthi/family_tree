import { Button, DatePicker, Form, Input, Select } from 'antd';
import UploadAvatar from './uploadAvatar';
import { useReactFlow } from 'reactflow';
import { getLayoutedElements } from '@/util/flowUtil';
import { v4 as uuidv4 } from 'uuid';
const AddPersonForm = () => {
  const { setNodes, getEdges, getNodes, setEdges } = useReactFlow();
  const onFinish = (value) => {
    console.log(value);
    let nodes = getNodes();
    let edges = getEdges();
    let id = uuidv4();

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      [
        ...nodes,
        {
          id: id,
          type: 'imageNode',
          data: { birthday: '1995/2/2', name: value.firstName },
        },
      ],
      [...edges, { id: uuidv4(), source: value?.father?.value, target: id }]
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
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
        labelCol={{ span: 24 }}
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
        labelCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: 'Please enter last Name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='Date of birth' name='birthDay' labelCol={{ span: 24 }}>
        <DatePicker />
      </Form.Item>
      <Form.Item label='Father' name='father' labelCol={{ span: 24 }}>
        <Select
          showSearch
          allowClear
          labelInValue
          options={[{ value: '1', label: 'salim' }]}
        />
      </Form.Item>
      <Form.Item label='Mother' name='mother' labelCol={{ span: 24 }}>
        <Select
          showSearch
          allowClear
          labelInValue
          options={[{ value: 1, label: 'salim' }]}
        />
      </Form.Item>
      <Form.Item label='Image' labelCol={{ span: 24 }}>
        <UploadAvatar />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddPersonForm;
