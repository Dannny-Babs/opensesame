"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Node } from '@xyflow/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react'

interface RightInspectorPanelProps {
    selectedNode: Node | null
    onClose?: () => void
    onUpdateNode?: (nodeId: string, data: Record<string, unknown>) => void
}

interface NodeFormData {
    label: string
    description: string
    [key: string]: unknown
}

interface SectionProps {
    formData: NodeFormData
    setFormData: (updater: (prev: NodeFormData) => NodeFormData) => void
    openSections: string[]
    toggleSection: (sectionId: string) => void
}

export function RightInspectorPanel({ selectedNode, onClose, onUpdateNode }: RightInspectorPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null)
    const [formData, setFormData] = useState<NodeFormData>({ label: '', description: '' })
    const [openSections, setOpenSections] = useState<string[]>(['general'])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Element)) {
                onClose?.()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    useEffect(() => {
        if (selectedNode) {
            setFormData({
                label: (selectedNode.data.label as string) || '',
                description: (selectedNode.data.description as string) || '',
                ...selectedNode.data
            })
        }
    }, [selectedNode])

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        )
    }

    const handleSave = () => {
        if (selectedNode && onUpdateNode) {
            onUpdateNode(selectedNode.id, formData)
        }
        onClose?.()
    }

    const handleCancel = () => {
        onClose?.()
    }

    if (!selectedNode) return null

    const renderNodeSpecificSections = () => {
        switch (selectedNode.type) {
            case 'apiAgent':
                return <ApiAgentSections formData={formData} setFormData={setFormData} openSections={openSections} toggleSection={toggleSection} />
            case 'decision':
                return <DecisionSections formData={formData} setFormData={setFormData} openSections={openSections} toggleSection={toggleSection} />
            case 'llmAgent':
                return <LLMAgentSections formData={formData} setFormData={setFormData} openSections={openSections} toggleSection={toggleSection} />
            default:
                return (
                    <div className="p-4 bg-blue-50 border-t border-blue-200">
                        <p className="text-sm text-blue-700">
                            Node-specific configuration for {String(selectedNode.type)} will be available in the next update.
                        </p>
                    </div>
                )
        }
    }

    return (
        <div
            ref={panelRef}
            className="m-2 w-96 rounded-lg bg-white border-[1.3px]  font-sans border-slate-200 z-20"
        >
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-gray-900">{formData.label || 'Untitled'}</h2>
                <p className="text-sm text-gray-500">{String(selectedNode.type)}</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {/* General Section */}
                <Collapsible open={openSections.includes('general')} onOpenChange={() => toggleSection('general')}>
                    <CollapsibleTrigger className="w-full p-4 bg-gray-50 border-b border-slate-200 flex items-center justify-between hover:bg-gray-100">
                        <span className="font-medium">General</span>
                        {openSections.includes('general') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Label</label>
                            <Input
                                value={formData.label}
                                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                                placeholder="Enter node label"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Enter node description"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                                rows={3}
                            />
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                {/* Node-specific sections */}
                {renderNodeSpecificSections()}

                {/* Prompt text guidance for templated nodes */}
                {selectedNode.type && ['llmAgent', 'webhookAgent', 'dbQuery'].includes(String(selectedNode.type)) && (
                    <div className="p-4 bg-yellow-50 border-t border-yellow-200">
                        <p className="text-xs text-yellow-700">
                            💡 Use <code>{'{{variableName}}'}</code> to inject data from prior nodes.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 flex gap-2">
                <Button variant="outline" onClick={handleCancel} className="flex-1 py-5">
                    Cancel
                </Button>
                <Button onClick={handleSave} className="flex-1 bg-slate-600 text-white hover:bg-slate-700 py-5">
                    Save
                </Button>
            </div>
        </div>
    )
}

// API Agent Sections
function ApiAgentSections({ formData, setFormData, openSections, toggleSection }: SectionProps) {
    const endpoints = (formData.endpoints as Array<{ method: string; path: string }>) || []

    const addEndpoint = () => {
        if (endpoints.length < 3) {
            setFormData((prev) => ({
                ...prev,
                endpoints: [...endpoints, { method: 'GET', path: '' }]
            }))
        }
    }

    const removeEndpoint = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            endpoints: endpoints.filter((_, i) => i !== index)
        }))
    }

    return (
        <>
            <Collapsible open={openSections.includes('endpoints')} onOpenChange={() => toggleSection('endpoints')}>
                <CollapsibleTrigger className="w-full p-4 bg-gray-50 border-b border-slate-200 flex items-center justify-between hover:bg-gray-100">
                    <span className="font-medium">Endpoints</span>
                    {openSections.includes('endpoints') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 space-y-4">
                    <Button
                        onClick={addEndpoint}
                        disabled={endpoints.length >= 3}
                        variant="outline"
                        size="sm"
                        className="w-full h-10 border-slate-200"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Endpoint
                    </Button>

                    {endpoints.map((endpoint, index) => (
                        <div key={index} className=" space-y-2">
                            <div className="flex gap-2 h-10 items-center ">
                                <select
                                    value={endpoint.method}
                                    onChange={(e) => {
                                        const newEndpoints = [...endpoints]
                                        newEndpoints[index] = { ...endpoint, method: e.target.value }
                                        setFormData((prev) => ({ ...prev, endpoints: newEndpoints }))
                                    }}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm w-24"
                                    aria-label="HTTP Method"
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                                <Input
                                    value={endpoint.path}
                                    onChange={(e) => {
                                        const newEndpoints = [...endpoints]
                                        newEndpoints[index] = { ...endpoint, path: e.target.value }
                                        setFormData((prev) => ({ ...prev, endpoints: newEndpoints }))
                                    }}
                                    placeholder="/api/orders/{id}"
                                    className="flex-1 h-10 border-slate-200"
                                />
                                <Button variant="ghost" size="sm" onClick={() => removeEndpoint(index)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {endpoints.length >= 3 && (
                        <p className="text-xs text-amber-600">Maximum 3 endpoints allowed</p>
                    )}
                </CollapsibleContent>
            </Collapsible>

            <Collapsible open={openSections.includes('advanced')} onOpenChange={() => toggleSection('advanced')}>
                <CollapsibleTrigger className="w-full p-4 bg-gray-50 border-b border-slate-200 flex items-center justify-between hover:bg-gray-100">
                    <span className="font-medium">Advanced</span>
                    {openSections.includes('advanced') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Timeout (seconds)</label>
                        <Input
                            type="number"
                            value={String(formData.timeout || '')}
                            onChange={(e) => setFormData((prev) => ({ ...prev, timeout: parseInt(e.target.value) || 0 }))}
                            placeholder="30"
                            className="mt-1 shadow-none border-slate-200 h-10"
                        />
                    </div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={Boolean(formData.retryEnabled)}
                                onChange={(e) => setFormData((prev) => ({ ...prev, retryEnabled: e.target.checked }))}

                            />
                            <span className="text-sm font-medium text-gray-700">Enable Retry</span>
                        </label>
                        {Boolean(formData.retryEnabled) && (
                            <Input
                                type="number"
                                min="1"
                                max="3"
                                value={String(formData.retryCount || '')}
                                onChange={(e) => setFormData((prev) => ({ ...prev, retryCount: parseInt(e.target.value) || 1 }))}
                                placeholder="3"
                                className="mt-2 shadow-none border-slate-200 h-10"
                            />
                        )}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}

// Decision Sections
function DecisionSections({ formData, setFormData, openSections, toggleSection }: SectionProps) {
    return (
        <Collapsible open={openSections.includes('condition')} onOpenChange={() => toggleSection('condition')}>
            <CollapsibleTrigger className="w-full p-4 bg-gray-50 border-b border-slate-200 flex items-center justify-between hover:bg-gray-100">
                <span className="font-medium">Condition</span>
                {openSections.includes('condition') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Field</label>
                    <Input
                        value={String(formData.conditionField || '')}
                        onChange={(e) => setFormData((prev) => ({ ...prev, conditionField: e.target.value }))}
                        placeholder="order.total"
                        className="mt-1"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Operator</label>
                    <select
                        value={String(formData.operator || '')}
                        onChange={(e) => setFormData((prev) => ({ ...prev, operator: e.target.value }))}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        aria-label="Operator"
                    >
                        <option value="">Select operator</option>
                        <option value="==">==</option>
                        <option value="!=">!=</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value=">=">&gt;=</option>
                        <option value="<=">&lt;=</option>
                        <option value="contains">contains</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Value</label>
                    <Input
                        value={String(formData.conditionValue || '')}
                        onChange={(e) => setFormData((prev) => ({ ...prev, conditionValue: e.target.value }))}
                        placeholder="1000"
                        className="mt-1"
                    />
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

// LLM Agent Sections
function LLMAgentSections({ formData, setFormData, openSections, toggleSection }: SectionProps) {
    return (
        <Collapsible open={openSections.includes('prompt')} onOpenChange={() => toggleSection('prompt')}>
            <CollapsibleTrigger className="w-full p-4 bg-gray-50 border-b border-slate-200 flex items-center justify-between hover:bg-gray-100">
                <span className="font-medium">Prompt Template</span>
                {openSections.includes('prompt') ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-4">
                <textarea
                    value={String(formData.promptTemplate || '')}
                    onChange={(e) => setFormData((prev) => ({ ...prev, promptTemplate: e.target.value }))}
                    placeholder="Analyze this customer request: {{input}}"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    rows={6}
                />
            </CollapsibleContent>
        </Collapsible>
    )
} 