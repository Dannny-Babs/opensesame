"use client"

import React, { useCallback, useState, useRef } from 'react'
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
    Node,
    Connection,
    ConnectionMode,
} from '@xyflow/react'
import { motion } from 'framer-motion'
import {
    PlusCircle,
    Save,
    UploadCloud,
    Play,
    FileCode,
    FileText,
    ListChecks,
    MessageSquare,
    ZoomIn,
    ZoomOut,
    RefreshCcw,
    Activity,
    Edit,
    Settings,
    Database,
    Bot,
    Bell,
    BookOpen,
    Repeat,
    GitBranch,
    HardDrive
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

// Custom node types for the canvas
const nodeTypes = {
    apiAgent: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-blue-100 border-2 border-blue-300 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    llmAgent: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-green-100 border-2 border-green-300 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    webhookAgent: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-purple-100 border-2 border-purple-300 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    decision: ({ data }: { data: any }) => (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="w-full h-full bg-yellow-100 border-2 border-yellow-300 transform rotate-45"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <GitBranch className="w-4 h-4" />
            </div>
        </div>
    ),
    loop: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-orange-100 border-2 border-orange-300 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <Repeat className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    parallel: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-indigo-100 border-2 border-indigo-300 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    kbLookup: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-teal-100 border-2 border-teal-300 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    dbQuery: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    cache: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-cyan-100 border-2 border-cyan-300 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <HardDrive className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    note: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-yellow-50 border-2 border-yellow-200 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    todo: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-green-50 border-2 border-green-200 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <ListChecks className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
    comment: ({ data }: { data: any }) => (
        <div className="px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg min-w-[120px]">
            <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">{data.label}</span>
            </div>
        </div>
    ),
}

interface MacroCanvasDashboardProps {
    macroId?: string
}

export function MacroCanvasDashboard({ macroId }: MacroCanvasDashboardProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [selectedNode, setSelectedNode] = useState<Node | null>(null)
    const [searchExpanded, setSearchExpanded] = useState(false)
    const reactFlowWrapper = useRef<HTMLDivElement>(null)

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    )

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        setSelectedNode(node)
    }, [])

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

            if (typeof type === 'undefined' || !type || !reactFlowWrapper.current) {
                return
            }

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
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

    // Simplified toolbar items
    const toolbarItems = [
        {
            icon: Save,
            label: 'Save Macro',
            action: () => console.log('Save macro')
        },
        {
            icon: UploadCloud,
            label: 'Publish Macro',
            action: () => console.log('Publish macro'),
            primary: true
        },
        {
            icon: FileCode,
            label: 'Export JSON',
            action: () => console.log('Export JSON')
        },
        {
            icon: Play,
            label: 'Run Macro',
            action: () => console.log('Run macro'),
            primary: true
        }
    ]

    // Node palette items
    const paletteItems = [
        {
            category: 'Agents',
            items: [
                { type: 'apiAgent', label: 'API Agent', icon: Settings },
                { type: 'llmAgent', label: 'LLM Agent', icon: Bot },
                { type: 'webhookAgent', label: 'Webhook Agent', icon: Bell },
            ]
        },
        {
            category: 'Logic & Control',
            items: [
                { type: 'decision', label: 'Decision', icon: GitBranch },
                { type: 'loop', label: 'Loop', icon: Repeat },
                { type: 'parallel', label: 'Parallel', icon: GitBranch },
            ]
        },
        {
            category: 'Data & Knowledge',
            items: [
                { type: 'kbLookup', label: 'KB Lookup', icon: BookOpen },
                { type: 'dbQuery', label: 'Database Query', icon: Database },
                { type: 'cache', label: 'Cache/State', icon: HardDrive },
            ]
        }
    ]

    // Bottom control items
    const bottomControls = [
        { type: 'note', label: 'Note', icon: FileText },
        { type: 'todo', label: 'TODO', icon: ListChecks },
        { type: 'comment', label: 'Comment', icon: MessageSquare },
    ]

    return (
        <TooltipProvider>
            <div className="h-screen bg-gray-50 flex">
                {/* Left Toolbar */}
                <div className="w-16 bg-white border-r border-gray-200 p-2 flex flex-col space-y-2 overflow-y-auto">
                    {/* Main Toolbar Actions */}
                    <div className="space-y-2 mb-4 border-b pb-4">
                        {toolbarItems.map((item, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`w-full h-12 p-2 ${item.primary ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
                                            }`}
                                        onClick={item.action}
                                    >
                                        <item.icon className="w-5 h-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>

                    {/* Node Palette */}
                    <div className="space-y-2">
                        {paletteItems.map((category) => (
                            <div key={category.category} className="space-y-1">
                                {category.items.map((item) => (
                                    <Tooltip key={item.type}>
                                        <TooltipTrigger asChild>
                                            <motion.div
                                                draggable
                                                onDragStart={(e) => onDragStart(e as any, item.type, item)}
                                                whileHover={{ scale: 1.05 }}
                                                className="w-12 h-12 border border-gray-200 rounded-lg cursor-move hover:border-blue-300 bg-white flex items-center justify-center"
                                            >
                                                <item.icon className="w-5 h-5 text-gray-600" />
                                            </motion.div>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>{item.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Canvas Area */}
                <div className="flex-1 relative">
                    {/* Bottom Controls */}
                    <div className="absolute bottom-4 left-4 z-10 bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex space-x-2">
                        {bottomControls.map((control) => (
                            <Tooltip key={control.type}>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        draggable
                                        onDragStart={(e) => onDragStart(e as any, control.type, control)}
                                        whileHover={{ scale: 1.05 }}
                                        className="w-10 h-10 border border-gray-200 rounded cursor-move hover:border-blue-300 bg-white flex items-center justify-center"
                                    >
                                        <control.icon className="w-4 h-4" />
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{control.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                        <div className="border-l pl-2 ml-2 flex space-x-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                                        <ZoomIn className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Zoom In</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                                        <ZoomOut className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Zoom Out</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                                        <RefreshCcw className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Reset View</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Bottom-Right Test Button */}
                    <Button
                        className="absolute bottom-4 right-4 z-10 bg-blue-600 text-white hover:bg-blue-700"
                        size="lg"
                    >
                        <Activity className="w-4 h-4 mr-2" />
                        Test Agent
                    </Button>

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
                            <MiniMap className="!bg-white !border-2 !border-gray-200" />
                        </ReactFlow>
                    </div>

                    {/* Empty State */}
                    {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No macros created</h3>
                                    <p className="text-gray-500 mb-4">Start building your automation workflow</p>
                                    <Button className="pointer-events-auto">
                                        <PlusCircle className="w-4 h-4 mr-2" />
                                        Create Your First Macro
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Inspector Panel */}
                {selectedNode && (
                    <div className="w-80 bg-white border-l border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">{selectedNode.data.label}</h3>
                            <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Node Type</label>
                                <p className="text-sm text-gray-600">{selectedNode.type}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Position</label>
                                <p className="text-sm text-gray-600">
                                    X: {Math.round(selectedNode.position.x)}, Y: {Math.round(selectedNode.position.y)}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                                    rows={3}
                                    placeholder="Add node description..."
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Tags</label>
                                <input
                                    placeholder="Add tags..."
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        </div>
                    </div>
                )}
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