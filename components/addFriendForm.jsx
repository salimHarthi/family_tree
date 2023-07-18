'use client';
import { Button, Form, Input, Switch, Modal } from 'antd';
import { useAddFriend } from '@/dataProvider/hooks';
import { UserAddOutlined } from '@ant-design/icons';
import { useState } from 'react';

const AddFriendForm = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trigger, isMutating } = useAddFriend();
  const onFinish = (value) => {
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
      <Button type='default' icon={<UserAddOutlined />} onClick={showModal}>
        Add Friend
      </Button>

      <Modal
        title='Add friend'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
          wrapperCol={{
            span: 23,
          }}
          layout='horizontal'
        >
          <Form.Item
            label='email'
            name='email'
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter family name',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddFriendForm;
