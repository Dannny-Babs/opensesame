'use client';

import React, { useCallback, useRef } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    addEdge,
    MiniMap,
    Connection,
    ConnectionMode,
    ReactFlowProvider,
    useReactFlow,
} from '@xyflow/react';
import { useFlowStore } from '../store/useFlowStore';
import nodeTypes from './NodeTypes';

let id = 0;
const getId = () => `dndnode_${id++}`;

function FlowContent() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { nodes, edges, onNodesChange, onEdgesChange, setEdges, setNodes } = useFlowStore();
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges(addEdge(connection, edges));
        },
        [setEdges, edges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes([...nodes, newNode]);
        },
        [screenToFlowPosition, nodes, setNodes]
    );

    return (
        <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                connectionMode={ConnectionMode.Loose}
                fitView
                className="bg-teal-50"
            >
                <Background gap={12} size={1} />
                <Controls />
                <MiniMap
                    className="!bg-white !border-2 !border-gray-200"
                    nodeColor={() => '#3B82F6'}
                />
            </ReactFlow>
        </div>
    );
}

export default function FlowCanvas() {
    return (
        <ReactFlowProvider>
            <FlowContent />
        </ReactFlowProvider>
    );
} 