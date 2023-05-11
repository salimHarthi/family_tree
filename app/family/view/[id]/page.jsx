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
export default function ViewFlowPage() {
  const [rfInstance, setRfInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const { setViewport } = useReactFlow();

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges}>
        <Controls />
        <MiniMap nodeColor='#6865A5' nodeStrokeWidth={3} zoomable pannable />
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
