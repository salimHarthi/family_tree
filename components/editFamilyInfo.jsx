'use client';
import { Form, Input, Switch, Modal } from 'antd';
import UploadAvatar from './uploadAvatar';
import { useUpdateFamily } from '@/dataProvider/hooks';
import { useState, useEffect, useMemo } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import SelectUsers from './selectUsers';
import { removeDupArObj } from '@/util/func';
const EditFamilyInfo = ({ data }) => {
  const initialValues = useMemo(() => {
    let edit = [];
    let view = [];
    data?.users?.forEach((item) => {
      if (item?.role?.includes('edit')) {
        edit.push(item?.userId?._id);
      } else if (item?.role?.includes('view')) {
        view.push(item?.userId?._id);
      }
    });
    return { ...data, edit: edit, view: view };
  }, [data]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trigger, isMutating } = useUpdateFamily(data?._id);
  const onFinish = (value) => {
    let edit = value?.edit?.map((item) => {
      return { userId: item, role: ['edit', 'view'] };
    });

    let view = value?.view?.map((item) => {
      return { userId: item, role: ['view'] };
    });
    let users = removeDupArObj([...edit, ...view], 'userId');
    trigger({ ...value, users: users });
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
  }, [data]);
  return (
    <>
      <PencilSquareIcon
        className='block h-8 w-8 cursor-pointer'
        aria-hidden='true'
        onClick={showModal}
      />
      <Modal
        title='Edit Family'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          initialValues={initialValues}
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
            <Switch defaultChecked={data.isPublic} />
          </Form.Item>

          {/* <Form.Item label='logo'>
            <UploadAvatar />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
export default EditFamilyInfo;
