"use client"

import React, { useEffect, useRef } from 'react'
import { Node } from '@xyflow/react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HugeiconsIcon } from '@hugeicons/react'
import { Copy01Icon, Delete02Icon, MoreHorizontalIcon, PencilEdit02Icon, Settings02Icon, EyeIcon } from '@hugeicons/core-free-icons'

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
            className="m-2 w-80 rounded-xl bg-white border-[1.3px]  font-sans border-slate-200 p-4 z-20"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{selectedNode.data.label as string}</h3>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <HugeiconsIcon icon={MoreHorizontalIcon} className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log('Edit node')}>
                            <HugeiconsIcon icon={PencilEdit02Icon} className="w-4 h-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('View details')}>
                            <HugeiconsIcon icon={EyeIcon} className="w-4 h-4 mr-2" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Settings')}>
                            <HugeiconsIcon icon={Settings02Icon} className="w-4 h-4 mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => console.log('Copy node')}>
                            <HugeiconsIcon icon={Copy01Icon} className="w-4 h-4 mr-2" />
                            Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => console.log('Delete node')}
                            className="text-red-600 focus:text-red-600"
                        >
                            <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
                <div className='flex flex-col gap-2 w-full'>
                    <Button
                        variant="outline"
                        size="lg"
                        className='w-full border-slate-300'
                        onClick={() => console.log('Copy node')}
                    >
                        <HugeiconsIcon icon={Copy01Icon} className="w-4 h-4 mr-2" />
                        Duplicate Node
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className='w-full bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700'
                        onClick={() => console.log('Delete node')}
                    >
                        <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4 mr-2" />
                        Delete Node
                    </Button>
                </div>
            </div>
        </div>
    )
} 