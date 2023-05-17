'use client';
import { Button, Form, Input, Switch, Card } from 'antd';
import UploadAvatar from './uploadAvatar';
import { useCreateFamily } from '@/dataProvider/hooks';
const AddFamilyForm = () => {
  const [form] = Form.useForm();
  const { trigger, isMutating } = useCreateFamily();
  const onFinish = (value) => {
    console.log(value);
    trigger(value);
  };

  return (
    <Card
      title='Creat new family'
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}

        wrapperCol={{
          span: 23,
        }}
        layout='horizontal'
      >
        <Form.Item
          label='Family Name'
          name='familyName'
          rules={[
            {
              required: true,
              message: 'Please enter family name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Public' name='isPublic'>
          <Switch />
        </Form.Item>
        <Form.Item label='logo'>
          <UploadAvatar />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default AddFamilyForm;
