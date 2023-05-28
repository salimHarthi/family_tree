import { memo, useState, useEffect } from 'react';
import { Handle, Position, useReactFlow, useNodeId } from 'reactflow';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Form, DatePicker, Input } from 'antd';
import Image from 'next/image';
import { cardWidth } from '@/constent';
import dayjs from 'dayjs';
const { Meta } = Card;
export default memo(({ data: { birthday, name, image }, isConnectable }) => {
  const nodeId = useNodeId();
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
  const { deleteElements, getNode, setNodes } = useReactFlow();
  const handleDeleteClick = () => {
    deleteElements({ nodes: [getNode(nodeId)] });
  };
  const onFinish = (value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            name: value?.fullName,
            birthday: value?.birthDay?.format('YYYY/MM/DD'),
          };
        }

        return node;
      })
    );
    setShowForm(false);
  };
  const editSave = showForm ? (
    <SaveOutlined key='save' onClick={form.submit} />
  ) : (
    <EditOutlined
      key='edit'
      onClick={() => {
        setShowForm(true);
      }}
    />
  );
  useEffect(() => {
    form.resetFields();
  }, [birthday, name]);
  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Card
        style={{
          width: cardWidth,
        }}
        cover={
          <Image
            style={{ maxHeight: 320, maxWidth: 240 }}
            src={image}
            width={240}
            height={320}
            alt='Picture of the author'
          />
        }
        actions={[
          editSave,
          <DeleteOutlined key='delete' onClick={handleDeleteClick} />,
        ]}
      >
        {showForm ? (
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{
              fullName: name,
              birthDay: dayjs(birthday),
            }}
            wrapperCol={{
              span: 23,
            }}
            layout='horizontal'
            style={{
              marginTop: 20,
              maxWidth: 600,
            }}
          >
            <Form.Item
              label='Full Name'
              name='fullName'
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Please enter Full name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Date of birth'
              name='birthDay'
              labelCol={{ span: 24 }}
            >
              <DatePicker />
            </Form.Item>
          </Form>
        ) : (
          <Meta className='text-center' title={name} description={birthday} />
        )}
      </Card>

      <Handle
        type='source'
        position={Position.Bottom}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </>
  );
});
