import { memo } from 'react';
import { Handle, Position, useReactFlow, useNodeId } from 'reactflow';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Image from 'next/image';
import { cardWidth } from '@/constent';
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
          width: cardWidth,
        }}
        cover={
          <Image
            style={{ maxHeight: 320, maxWidth: 240 }}
            src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            width={240}
            height={320}
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
