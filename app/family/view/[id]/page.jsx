'use client';
import React, { useEffect, useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
  Panel,
} from 'reactflow';
import ImageNode from '@/components/imageNode';
import 'reactflow/dist/style.css';
import { getLayoutedElements, downloadImage } from '@/util/flowUtil';
import { useGetOneFamily } from '@/dataProvider/hooks';
import { Button, Space, Spin } from 'antd';
import {
  SaveOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

const nodeTypes = {
  imageNode: ImageNode,
};

export default function Page({ params }) {
  const { data, isLoading, isError, mutate, isValidating } = useGetOneFamily(
    params?.id
  );
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const { setViewport, getNodes } = useReactFlow();
  useEffect(() => {
    if (data) {
      setNodes(data.flow.nodes || []);
      setEdges(data.flow.edges || []);
      setViewport(data.flow.viewport);
    }
  }, [data, isValidating]);
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      mutate();
    };

    restoreFlow();
  }, [setNodes, setViewport]);
  return (
    <Spin spinning={isLoading} size={'large'}>
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          fitView
        >
          <Controls />
          <MiniMap nodeColor='#6865A5' nodeStrokeWidth={3} zoomable pannable />
          <Background variant='dots' gap={12} size={1} />
          <Panel position='top-right'>
            <Space direction='horizontal'>
              <Button
                size='large'
                type='primary'
                icon={<DownloadOutlined />}
                onClick={() => {
                  downloadImage(getNodes);
                }}
              ></Button>
              <Button
                size='large'
                type='primary'
                ghost={false}
                onClick={() => onLayout('TB')}
              >
                Align
              </Button>
              <Button
                size='large'
                icon={<ReloadOutlined />}
                type='primary'
                onClick={onRestore}
              ></Button>
            </Space>
          </Panel>
        </ReactFlow>
      </div>
    </Spin>
  );
}
