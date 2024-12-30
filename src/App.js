import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Handle,
  ConnectionLineType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    type: 'custom',
  },
  {
    id: '2',
    position: { x: 200, y: 0 },
    data: { label: 'Node 2' },
    type: 'custom',
  },
  {
    id: '3',
    position: { x: 0, y: 200 },
    data: { label: 'Node 3' },
    type: 'custom',
  },
  {
    id: '4',
    position: { x: 200, y: 200 },
    data: { label: 'Node 4' },
    type: 'custom',
  },
  {
    id: '5',
    position: { x: 0, y: 300 },
    data: { label: 'Node 5' },
    type: 'custom',
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'default',
    markerEnd: {
      type: 'arrowclosed', // Add arrow marker
      color: 'blue',
    },
    style: { stroke: 'blue', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'default',
    markerEnd: {
      type: 'arrowclosed', // Add arrow marker
      color: 'green',
    },
    style: { stroke: 'green', strokeWidth: 2 },
  },

   {
    id: 'e2-4',
    source: '3',
    target: '4',
    type: 'default',
    markerEnd: {
      type: 'arrowclosed', // Add arrow marker
      color: 'red',
    },
    style: { stroke: 'red', strokeWidth: 2 },
  },

   {
    id: 'e2-5',
    source: '4',
    target: '5',
    type: 'default',
    markerEnd: {
      type: 'arrowclosed', // Add arrow marker
      color: '#500073',
    },
    style: { stroke: '#500073', strokeWidth: 2 },
  },


];

function CustomNode({ data }) {
  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        textAlign: 'center',
      }}
    >
      {data.label}
      {/* Add Handles for connections */}
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ custom: CustomNode }}
        connectionLineType={ConnectionLineType.Bezier} // Use custom connection line
        fitView
      >
        {/* Add a background */}
        <Background
          variant="dots"
          gap={30}
          size={5}
          color="#e0e0e0"
        />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
