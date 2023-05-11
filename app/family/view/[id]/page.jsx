'use client';
import React from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import ImageNode from '@/components/imageNode';
import 'reactflow/dist/style.css';
import { getLayoutedElements } from '@/util/flowUtil';
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
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);
export default function ViewFlowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView>
        <Controls />
        <MiniMap nodeColor='#6865A5' nodeStrokeWidth={3} zoomable pannable />
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
