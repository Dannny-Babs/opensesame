/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { useReactFlow } from '@xyflow/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Comment01Icon, Note01Icon, ZoomOutAreaIcon, ZoomInAreaIcon, RefreshIcon } from '@hugeicons/core-free-icons'

interface BottomControlsProps {
    onDragStart: (event: React.DragEvent, nodeType: string, data: any) => void
}

export function BottomControls({ onDragStart }: BottomControlsProps) {
    const { zoomIn, zoomOut, fitView } = useReactFlow()

    // Bottom control items
    const bottomControls = [
        { type: 'note', label: 'Note', icon: Note01Icon },
        { type: 'comment', label: 'Comment', icon: Comment01Icon },
    ]

    const handleZoomIn = () => {
        zoomIn({ duration: 300 })
    }

    const handleZoomOut = () => {
        zoomOut({ duration: 300 })
    }

    const handleResetView = () => {
        fitView({ duration: 300, padding: 0.1 })
    }

    return (
        <div className="absolute bottom-4 left-4 z-10 bg-white border border-slate-200 rounded-xl p-2 flex space-x-2">
            {bottomControls.map((control) => (
                <Tooltip key={control.type}>
                    <TooltipTrigger asChild>
                        <motion.div
                            draggable
                            onDragStart={(e) => onDragStart(e as any, control.type, control)}
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 border border-slate-200 rounded-lg cursor-move hover:border-blue-300 bg-white flex items-center justify-center"
                        >
                            <HugeiconsIcon icon={control.icon} strokeWidth={1.7} className="w-5 h-5" />
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
                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0" onClick={handleZoomIn}>
                            <HugeiconsIcon icon={ZoomInAreaIcon} strokeWidth={1.7} className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Zoom In</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0" onClick={handleZoomOut}>
                            <HugeiconsIcon icon={ZoomOutAreaIcon} strokeWidth={1.7} className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Zoom Out</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0" onClick={handleResetView}>
                            <HugeiconsIcon icon={RefreshIcon} strokeWidth={1.7} className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Reset View</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
} 