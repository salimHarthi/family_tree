'use client';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
// import UploadAvatar from './uploadAvatar';
import { useReactFlow } from 'reactflow';
import { getLayoutedElements } from '@/util/flowUtil';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { useGetOneFamily } from '@/dataProvider/hooks';
import { useMemo } from 'react';

const AddPersonForm = ({ id }) => {
  const { data, isLoading, isError, mutate, isValidating } =
    useGetOneFamily(id);
  const { setNodes, getEdges, getNodes, setEdges } = useReactFlow();
  const listOfNode = getNodes();
  const parentOptions = useMemo(() => {
    if (data) {
      let apiNodes = data?.flow?.nodes?.map((item) => {
        return { value: item?.id, label: item?.data?.name };
      });
      let otherNodes = listOfNode?.map((item) => {
        return { value: item?.id, label: item?.data?.name };
      });
      let combinedArray = [...apiNodes, ...otherNodes];
      const unique = combinedArray.filter(
        (obj, index) =>
          combinedArray.findIndex((item) => item.value === obj.value) === index
      );
      return unique;
    }
    return [];
  }, [data, listOfNode]);
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

  const onFinish = (value) => {
    const listOfNode = getNodes();
    const listOfEdges = getEdges();
    const parentId = uuidv4();

    value?.children?.forEach((item) => {
      let childId = uuidv4();
      listOfNode.push({
        id: childId,
        type: 'imageNode',
        data: {
          birthday: item?.birthDay?.format('YYYY/MM/DD'),
          name: `${item.firstName} ${item.lastName}`,
          image: faker.image.avatarGitHub(),
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
            birthday: value?.birthDay?.format('YYYY/MM/DD'),
            name: `${value.firstName} ${value.lastName}`,
            image: faker.image.avatarGitHub(),
          },
        },
      ],
      [
        ...listOfEdges,
        { id: uuidv4(), source: value?.parent?.value, target: parentId },
      ]
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    form.resetFields();
  };

  return (
    <Form
      isLoading={isLoading}
      form={form}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}

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
      <Form.Item label='Parent' name='parent' labelCol={{ span: 24 }}>
        <Select showSearch allowClear labelInValue options={parentOptions} />
      </Form.Item>
      {/* <Form.Item label='Mother' name='mother' labelCol={{ span: 24 }}>
        <Select
          showSearch
          allowClear
          labelInValue
          options={[{ value: 1, label: 'salim' }]}
        />
      </Form.Item> */}
      {/* <Form.Item label='Image' labelCol={{ span: 24 }}>
        <UploadAvatar />
      </Form.Item> */}
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
                {/* <Form.Item labelCol={{ span: 24 }} {...restField} label='Image'>
                  <UploadAvatar />
                </Form.Item> */}
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
