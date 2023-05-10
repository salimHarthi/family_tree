import { Button, DatePicker, Form, Input } from 'antd';
import UploadAvatar from './uploadAvatar';

const onFinish = (value) => {
  console.log(value);
};
const AddPersonForm = () => {
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
