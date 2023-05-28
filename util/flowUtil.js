import dagre from 'dagre';
import { cardWidth, cardHeight } from '@/constent';
import { getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = cardWidth;
const nodeHeight = cardHeight + 20;

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
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

export const ImageDownloader = (dataUrl) => {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
};

export const downloadImage = (getNodes) => {
  // we calculate a transform for the nodes so that all nodes are visible
  // we then overwrite the transform of the `.react-flow__viewport` element
  // with the style option of the html-to-image library

  const imageWidth = 1024;
  const imageHeight = 768;
  const nodesBounds = getRectOfNodes(getNodes());
  const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight);

  toPng(document.querySelector('.react-flow__viewport'), {
    backgroundColor: '#1a365d',
    width: imageWidth,
    height: imageHeight,
    style: {
      width: imageWidth,
      height: imageHeight,
      transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
    },
  }).then(ImageDownloader);
};
