'use client';
import { Button, Form, Input, Switch, Modal } from 'antd';
import UploadAvatar from './uploadAvatar';
import { useCreateFamily } from '@/dataProvider/hooks';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
const AddFamilyForm = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trigger, isMutating } = useCreateFamily();
  const onFinish = (value) => {
    console.log(value);
    trigger(value);
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type='primary' size='large' onClick={showModal}>
        <PlusOutlined />
      </Button>

      <Modal
        title='Creat new family'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
        </Form>
      </Modal>
    </>
  );
};
export default AddFamilyForm;
