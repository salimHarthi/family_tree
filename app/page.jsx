'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import ImageNode from '@/components/imageNode';
import 'reactflow/dist/style.css';
const snapGrid = [20, 20];
const nodeTypes = {
  imageNode: ImageNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const initialNodes = [
  {
    id: '1',
    type: 'imageNode',
    position: { x: 0, y: 0 },
    data: { birthday: '1995/2/2', name: 'salim' },
  },
  {
    id: '2',
    type: 'imageNode',
    position,
    data: { birthday: '1995/2/2', name: 'salim' },
  },
  {
    id: '3',
    type: 'imageNode',
    position,
    data: { birthday: '1995/2/2', name: 'salim' },
  },
  {
    id: '4',
    type: 'imageNode',
    position,
    data: { birthday: '1995/2/2', name: 'salim' },
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
