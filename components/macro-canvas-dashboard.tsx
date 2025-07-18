/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useCallback, useState } from 'react'
import {
    addEdge,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
    Node,
    Connection,
} from '@xyflow/react'
import {
    TooltipProvider,
} from '@/components/ui/tooltip'

// Import the smaller components
import { LeftToolbar } from './macro-canvas/left-toolbar'
import { CanvasArea } from './macro-canvas/canvas-area'
import { RightInspectorPanel } from './macro-canvas/right-inspector-panel'
import { nodeTypes } from './macro-canvas/node-types'
import { initialNodes, initialEdges } from '@/data/initialFlow'

interface MacroCanvasDashboardProps {
    macroId?: string
}

export function MacroCanvasDashboard({ macroId }: MacroCanvasDashboardProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const [selectedNode, setSelectedNode] = useState<Node | null>(null)

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    )

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        setSelectedNode(node)
    }, [])

    const onCloseInspector = useCallback(() => {
        setSelectedNode(null)
    }, [])

    const onUpdateNode = useCallback((nodeId: string, data: Record<string, unknown>) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, ...data } }
                    : node
            )
        )
        // Update selectedNode if it's the same node being updated
        setSelectedNode((prevSelected) =>
            prevSelected?.id === nodeId
                ? { ...prevSelected, data: { ...prevSelected.data, ...data } }
                : prevSelected
        )
    }, [setNodes])

    const onDragStart = (event: React.DragEvent, nodeType: string, data: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType)
        event.dataTransfer.setData('application/nodedata', JSON.stringify(data))
        event.dataTransfer.effectAllowed = 'move'
    }

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault()

            const type = event.dataTransfer.getData('application/reactflow')
            const nodeData = JSON.parse(event.dataTransfer.getData('application/nodedata') || '{}')

            if (typeof type === 'undefined' || !type) {
                return
            }

            // Get the bounding rect of the React Flow container
            const reactFlowBounds = (event.target as HTMLElement).getBoundingClientRect()

            const position = {
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            }

            const newNode: Node = {
                id: `${type}-${Date.now()}`,
                type,
                position,
                data: { label: nodeData.label || `${type} node` },
            }

            setNodes((nds) => [...nds, newNode])
        },
        [setNodes],
    )

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    return (
        <TooltipProvider>
            <div className="h-screen bg-gray-50 flex relative">
                <CanvasArea
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    nodeTypes={nodeTypes}
                    leftToolbar={<LeftToolbar onDragStart={onDragStart} />}
                />

                <RightInspectorPanel
                    selectedNode={selectedNode}
                    onClose={onCloseInspector}
                    onUpdateNode={onUpdateNode}
                />
            </div>
        </TooltipProvider>
    )
}

export default function MacroCanvasDashboardWrapper(props: MacroCanvasDashboardProps) {
    return (
        <ReactFlowProvider>
            <MacroCanvasDashboard {...props} />
        </ReactFlowProvider>
    )
}