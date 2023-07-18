import React from 'react';
import { Avatar, Select } from 'antd';
import { useGetUserFriends } from '@/dataProvider/hooks';
const { Option } = Select;
const SelectUsers = ({ ...props }) => {
  const { data, isLoading } = useGetUserFriends();
  return (
    <Select
      allowClear
      mode='multiple'
      loading={isLoading}
      style={{ minWidth: 200 }}
      placeholder='Select a user'
      {...props}
    >
      {data?.map((item) => {
        return (
          <Option key={item?._id} value={item?._id}>
            <Avatar src={item?.image} key={item?._id} /> {item?.email}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectUsers;
