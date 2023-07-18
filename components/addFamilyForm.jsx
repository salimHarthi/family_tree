'use client';
import { Button, Form, Input, Switch, Modal } from 'antd';
import UploadAvatar from './uploadAvatar';
import { useCreateFamily } from '@/dataProvider/hooks';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { removeDupArObj } from '@/util/func';
import SelectUsers from './selectUsers';

const AddFamilyForm = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trigger, isMutating } = useCreateFamily();
  const onFinish = (value) => {
    let edit = value?.edit?.map((item) => {
      return { userId: item, role: ['edit', 'view'] };
    });

    let view = value?.view?.map((item) => {
      return { userId: item, role: ['view'] };
    });
    let users = removeDupArObj([...edit, ...view], 'userId');

    trigger({ ...value, logo: faker.image.avatarGitHub(), users: users });
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
      <Button
        type='default'
        size='large'
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Add a Family
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
          <Form.Item label='Viewer' name='view'>
            <SelectUsers />
          </Form.Item>
          <Form.Item label='Editor' name='edit'>
            <SelectUsers />
          </Form.Item>
          <Form.Item label='Public' name='isPublic'>
            <Switch />
          </Form.Item>
          {/* <Form.Item label='logo'>
            <UploadAvatar />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
export default AddFamilyForm;
