'use client';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import UploadAvatar from './uploadAvatar';
import { useReactFlow } from 'reactflow';
import { getLayoutedElements } from '@/util/flowUtil';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const AddPersonForm = () => {
  const [form] = Form.useForm();
  const handelLastNameChange = (lastName) => {
    let fields = form.getFieldValue('children') || [];
    fields?.forEach((item, index) => {
      if (!item) {
        fields[index] = {};
        fields[index]['lastName'] = lastName;
      } else {
        fields[index]['lastName'] = lastName;
      }
    });

    form.setFieldsValue({ fields });
  };
  const { setNodes, getEdges, getNodes, setEdges } = useReactFlow();
  const onFinish = (value) => {
    console.log(value);
    const listOfNode = getNodes();
    const listOfEdges = getEdges();
    const parentId = uuidv4();

    value?.children?.forEach((item) => {
      let childId = uuidv4();
      listOfNode.push({
        id: childId,
        type: 'imageNode',
        data: {
          birthday: '1995/2/2',
          name: `${item.firstName} ${item.lastName}`,
        },
      });
      listOfEdges.push({ id: uuidv4(), source: parentId, target: childId });
    });
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      [
        ...listOfNode,
        {
          id: parentId,
          type: 'imageNode',
          data: {
            birthday: '1995/2/2',
            name: `${value.firstName} ${value.lastName}`,
          },
        },
      ],
      [
        ...listOfEdges,
        { id: uuidv4(), source: value?.father?.value, target: parentId },
      ]
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}

      wrapperCol={{
        span: 23,
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
        label='Last Name'
        name='lastName'
        labelCol={{ span: 24 }}
        rules={[
          {
            required: true,
            message: 'Please enter last Name',
          },
        ]}
      >
        <Input
          onChange={(e) => {
            handelLastNameChange(e.target.value);
          }}
        />
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
      <Form.List name='children' form={form}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                direction='vertical'
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 20,
                }}
                align='baseline'
              >
                <Form.Item
                  label='First Name'
                  labelCol={{ span: 24 }}
                  {...restField}
                  name={[name, 'firstName']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing first name',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  {...restField}
                  name={[name, 'lastName']}
                  label='Last Name'
                  rules={[
                    {
                      required: true,
                      message: 'Missing last name',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  {...restField}
                  name={[name, 'birthDay']}
                  label='Date of birth'
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item labelCol={{ span: 24 }} {...restField} label='Image'>
                  <UploadAvatar />
                </Form.Item>
                <Button
                  type='dashed'
                  onClick={() => remove(name)}
                  block
                  icon={<MinusCircleOutlined />}
                >
                  Delete field
                </Button>
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add children
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddPersonForm;
