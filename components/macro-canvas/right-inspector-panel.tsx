"use client"

import React from 'react'
import { Node } from '@xyflow/react'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RightInspectorPanelProps {
    selectedNode: Node | null
}

export function RightInspectorPanel({ selectedNode }: RightInspectorPanelProps) {
    if (!selectedNode) return null

    return (
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
    )
} 