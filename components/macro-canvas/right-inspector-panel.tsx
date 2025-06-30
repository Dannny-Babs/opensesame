"use client"

import React, { useEffect, useRef } from 'react'
import { Node } from '@xyflow/react'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Copy01Icon, Delete02Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons'

interface RightInspectorPanelProps {
    selectedNode: Node | null
    onClose?: () => void
}

export function RightInspectorPanel({ selectedNode, onClose }: RightInspectorPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null)

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

    if (!selectedNode) return null

    return (
        <div
            ref={panelRef}
            className="w-80 rounded-xl m-2 right-2 bg-white border-[1.3px] font-sans border-slate-200 p-4"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{selectedNode.data.label as string}</h3>
                <Button variant="ghost" size="sm">
                    <HugeiconsIcon icon={PencilEdit02Icon} className="w-4 h-4" />
                </Button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Node Type</label>
                    <p className="text-sm text-gray-600">{selectedNode.type}</p>
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
                <div className='flex flex-row gap-2 w-full'>
                    <Button variant="outline" size="lg" className='w-36 bg-red-600 border-0 text-white w-full' onClick={() => {
                        console.log('Delete node')
                    }}>
                        <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4" /> Delete
                    </Button>
                    <Button variant="outline" size="lg" className=' border-slate-300 w-full' onClick={() => {
                        console.log('Copy node')
                    }}>
                        <HugeiconsIcon icon={Copy01Icon} className="w-4 h-4" /> Copy

                    </Button>
                </div>
            </div>
        </div>
    )
} 