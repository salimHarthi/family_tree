'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Panel,
  ConnectionLineType,
} from 'reactflow';
import ImageNode from '@/components/imageNode';
import dagre from 'dagre';
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

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 324;
const nodeHeight = 324;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);
export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
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
        <Panel position='top-right'>
          <button
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={() => onLayout('TB')}
          >
            Align
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
