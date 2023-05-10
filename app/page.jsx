'use client';
import AddPersonForm from '@/components/addPersonForm';
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
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import { Button } from 'antd';
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
      localStorage.setItem('flowKey', JSON.stringify(flow));
    }
  }, [rfInstance]);
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem('flowKey'));

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
    <div style={{ width: '100vw', height: '100vh' }}>
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
          <Button type='primary' ghost={false} onClick={() => onLayout('TB')}>
            Align
          </Button>
          <Button type='primary' onClick={onSave}>
            save
          </Button>
          <Button type='primary' onClick={onRestore}>
            restore
          </Button>
        </Panel>
      </ReactFlow>
      <AddPersonForm />
    </div>
  );
}
