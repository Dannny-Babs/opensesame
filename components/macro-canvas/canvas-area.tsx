/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useRef } from 'react'
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    Node,
    Edge,
    Connection,
    ConnectionMode,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    NodeTypes
} from '@xyflow/react'
import { BottomControls } from './bottom-controls'
import { TestAgentButton } from './test-agent-button'
import { EmptyState } from './empty-state'

interface CanvasAreaProps {
    nodes: Node[]
    edges: Edge[]
    onNodesChange: OnNodesChange
    onEdgesChange: OnEdgesChange
    onConnect: OnConnect
    onNodeClick: (event: React.MouseEvent, node: Node) => void
    onDrop: (event: React.DragEvent) => void
    onDragOver: (event: React.DragEvent) => void
    onDragStart: (event: React.DragEvent, nodeType: string, data: any) => void
    nodeTypes: NodeTypes
    leftToolbar?: React.ReactNode
}

export function CanvasArea({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onDrop,
    onDragOver,
    onDragStart,
    nodeTypes,
    leftToolbar
}: CanvasAreaProps) {
    const reactFlowWrapper = useRef<HTMLDivElement>(null)

    return (
        <div className="flex-1 relative">
            {leftToolbar}
            <BottomControls onDragStart={onDragStart} />
            <TestAgentButton />

            {/* React Flow Canvas */}
            <div ref={reactFlowWrapper} className="w-full h-full">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    connectionMode={ConnectionMode.Loose}
                    fitView
                >
                    <Background gap={20} size={1} />
                    <Controls />
                </ReactFlow>
            </div>

            <EmptyState visible={nodes.length === 0} />
        </div>
    )
} 