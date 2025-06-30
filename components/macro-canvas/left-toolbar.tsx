"use client"

import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Bookmark02Icon, FileExportIcon, PlayIcon, EnergyIcon, Robot01Icon, ChatBotIcon, Saturn01Icon, GitBranchIcon, RepeatIcon, Menu09Icon, AiLearningIcon, DatabaseIcon, HardDriveIcon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface LeftToolbarProps {
    onDragStart: (event: React.DragEvent, nodeType: string, data: { type: string; label: string; icon: unknown }) => void
}

export function LeftToolbar({ onDragStart }: LeftToolbarProps) {
    // Simplified toolbar items
    const toolbarItems = [
        {
            icon: Bookmark02Icon,
            label: 'Save ',
            action: () => console.log('Save macro')
        },

        {
            icon: FileExportIcon,
            label: 'Export JSON',
            action: () => console.log('Export JSON')
        },
        {
            icon: PlayIcon,
            label: 'Run',
            action: () => console.log('Run macro'),
            secondary: true
        },
        {
            icon: EnergyIcon,
            label: 'Publish',
            action: () => console.log('Publish macro'),
            primary: true
        },
    ]

    // Node palette items organized by updated categories
    const paletteItems = [
        {
            category: 'Agents',
            items: [
                { type: 'apiAgent', label: 'API Agent', icon: Robot01Icon },
                { type: 'llmAgent', label: 'LLM Agent', icon: ChatBotIcon },
                { type: 'webhookAgent', label: 'Webhook Agent', icon: Saturn01Icon },
            ]
        },
        {
            category: 'Control Flow',
            items: [
                { type: 'decision', label: 'Decision', icon: GitBranchIcon },
                { type: 'loop', label: 'Loop', icon: RepeatIcon },
                { type: 'parallel', label: 'Parallel', icon: Menu09Icon },
            ]
        },
        {
            category: 'Data & Knowledge',
            items: [
                { type: 'kbLookup', label: 'KB Lookup', icon: AiLearningIcon },
                { type: 'dbQuery', label: 'Database Query', icon: DatabaseIcon },
                { type: 'cache', label: 'Cache/State', icon: HardDriveIcon },
            ]
        }
    ]

    return (
        <>
            {/* Top Toolbar */}
            <div className="absolute  right-4 top-2  z-10  bg-white 
                    border rounded-lg border-gray-200 p-2 flex flex-row 
                    space-x-2 overflow-y-auto font-sans">
                {toolbarItems.map((item, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-10 p-2 flex flex-row 
                                    items-center justify-center ${item.primary ? 'bg-blue-600 text-white hover:bg-blue-700' : ''} ${item.secondary ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : ''}`}
                                onClick={item.action}
                            >
                                <HugeiconsIcon icon={item.icon} strokeWidth={1.7} className="w-5 h-5" />
                                <span className="text-sm font-medium">
                                    {item.label}
                                </span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{item.label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>


            {/* Node Palette */}
            <div className="absolute top-2 left-2 z-10
                    bg-white border-[1.5px] rounded-xl border-slate-200 p-2 flex 
                    flex-col space-y-2 overflow-y-auto font-sans">
                {paletteItems.map((category) => (
                    <div key={category.category} className="space-y-1">
                        {category.items.map((item) => (
                            <Tooltip key={item.type}>
                                <TooltipTrigger asChild>
                                    <div
                                        draggable
                                        onDragStart={(e) => onDragStart(e, item.type, item)}
                                        className="w-10 h-10 border 
                                                border-slate-200 rounded-lg 
                                                cursor-move 
                                                hover:border-blue-300 bg-white 
                                                flex items-center 
                                                justify-center hover:scale-105 
                                                transition-transform"
                                    >
                                        <HugeiconsIcon icon={item.icon} strokeWidth={1.5} className="w-5 h-5 
                                                text-slate-700" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
} 