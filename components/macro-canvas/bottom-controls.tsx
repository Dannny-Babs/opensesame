/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import {
    FileText,
    ListChecks,
    MessageSquare,
    ZoomIn,
    ZoomOut,
    RefreshCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface BottomControlsProps {
    onDragStart: (event: React.DragEvent, nodeType: string, data: any) => void
}

export function BottomControls({ onDragStart }: BottomControlsProps) {
    // Bottom control items
    const bottomControls = [
        { type: 'note', label: 'Note', icon: FileText },
        { type: 'todo', label: 'TODO', icon: ListChecks },
        { type: 'comment', label: 'Comment', icon: MessageSquare },
    ]

    return (
        <div className="absolute bottom-4 left-4 z-10 bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex space-x-2">
            {bottomControls.map((control) => (
                <Tooltip key={control.type}>
                    <TooltipTrigger asChild>
                        <motion.div
                            draggable
                            onDragStart={(e) => onDragStart(e as any, control.type, control)}
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 border border-slate-200 rounded-md cursor-move hover:border-blue-300 bg-white flex items-center justify-center"
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
    )
} 