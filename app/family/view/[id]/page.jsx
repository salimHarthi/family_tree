'use client';
import React, { useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
} from 'reactflow';
import ImageNode from '@/components/imageNode';
import 'reactflow/dist/style.css';
import { getLayoutedElements } from '@/util/flowUtil';
import { useGetOneFamily } from '@/dataProvider/hooks';
const nodeTypes = {
  imageNode: ImageNode,
};

export default function Page({ params }) {
  const { data, isLoading, isError } = useGetOneFamily(params?.id);
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const { setViewport } = useReactFlow();
  useEffect(() => {
    if (data) {
      setNodes(data.flow.nodes || []);
      setEdges(data.flow.edges || []);
      setViewport(data.flow.viewport);
    }
  }, [data]);

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
