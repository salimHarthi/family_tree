'use client';
import { Form, Input, Switch, Modal } from 'antd';
import UploadAvatar from './uploadAvatar';
import { useUpdateFamily } from '@/dataProvider/hooks';
import { useState, useEffect } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const EditFamilyInfo = ({ data }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trigger, isMutating } = useUpdateFamily(data?._id);
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
  useEffect(() => {
    form.resetFields();
    console.log(data);
  }, [data]);
  return (
    <>
      <PencilSquareIcon
        className='block h-8 w-8 cursor-pointer'
        aria-hidden='true'
        onClick={showModal}
      />
      <Modal
        title='Creat new family'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          initialValues={data}
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
            <Switch checked={data.isPublic} />
          </Form.Item>
          <Form.Item label='logo'>
            <UploadAvatar />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditFamilyInfo;
