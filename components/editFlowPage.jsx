'use client';
import React, { useCallback, useState } from 'react';
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
const nodeTypes = {
  imageNode: ImageNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'imageNode',
    data: { birthday: '1995/2/2', name: 'salim' },
  },
  {
    id: '2',
    type: 'imageNode',
    data: { birthday: '1995/2/2', name: 'salim' },
  },
  {
    id: '3',
    type: 'imageNode',
    data: { birthday: '1995/2/2', name: 'salim' },
  },
  {
    id: '4',
    type: 'imageNode',
    data: { birthday: '1995/2/2', name: 'salim' },
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);
export default function EditFlowPage() {
  const [rfInstance, setRfInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const { setViewport } = useReactFlow();

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
      console.log(flow);
      localStorage.setItem('flowKey', JSON.stringify(flow));
    }
  }, [rfInstance]);
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem('flowKey'));
      console.log(flow);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
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
