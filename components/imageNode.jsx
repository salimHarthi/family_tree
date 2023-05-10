import { memo } from 'react';
import { Handle, Position, useReactFlow, useNodeId } from 'reactflow';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Image from 'next/image';
const { Meta } = Card;
export default memo(({ data: { birthday, name }, isConnectable }) => {
  const nodeId = useNodeId();
  const { deleteElements, getNode } = useReactFlow();
  const handleDeleteClick = () => {
    deleteElements({ nodes: [getNode(nodeId)] });
  };
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
          width: 300,
        }}
        cover={
          <Image
            src='https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3d%2FLARGE_elevation.jpg&tbnid=uIOGmXgqKgttOM&vet=12ahUKEwi65fmHzur-AhWCp0wKHVHJAdUQMygAegUIARDcAQ..i&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ALARGE_elevation.jpg&docid=xFnR6w-DJXs-SM&w=10800&h=5400&q=large%20image&ved=2ahUKEwi65fmHzur-AhWCp0wKHVHJAdUQMygAegUIARDcAQ'
            width={300}
            height={180}
            alt='Picture of the author'
          />
        }
        actions={[
          <EditOutlined key='edit' />,
          <DeleteOutlined key='delete' onClick={handleDeleteClick} />,
        ]}
      >
        <Meta className='text-center' title={name} description={birthday} />
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
