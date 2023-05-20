'use client';
import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Panel,
  useReactFlow,
} from 'reactflow';
import ImageNode from '@/components/imageNode';
import 'reactflow/dist/style.css';
import { getLayoutedElements } from '@/util/flowUtil';
import { Button, Space } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import { useGetOneFamily, useUpdateFamily } from '@/dataProvider/hooks';

const nodeTypes = {
  imageNode: ImageNode,
};

export default function EditFlowPage({ id }) {
  const { data, isLoading, isError, mutate, isValidating } =
    useGetOneFamily(id);

  const [rfInstance, setRfInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const { setViewport } = useReactFlow();
  const { trigger, isMutating } = useUpdateFamily(id);
  useEffect(() => {
    if (data) {
      setNodes(data.flow.nodes || []);
      setEdges(data.flow.edges || []);
      setViewport(data.flow.viewport);
    }
  }, [data, isValidating]);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params }, eds)),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      trigger({ flow: flow });
    }
  }, [rfInstance]);
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      mutate();
    };

    restoreFlow();
  }, [setNodes, setViewport]);
  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
      >
        <Controls />
        <MiniMap nodeColor='#6865A5' nodeStrokeWidth={3} zoomable pannable />
        <Background variant='dots' gap={12} size={1} />
        <Panel position='top-right'>
          <Space direction='horizontal'>
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
              icon={<SaveOutlined />}
              type='primary'
              onClick={onSave}
            ></Button>
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
  );
}
