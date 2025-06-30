"use client"

import React from 'react'
import { motion } from 'framer-motion'
import {
    Save,
    UploadCloud,
    Play,
    FileCode,
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
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface LeftToolbarProps {
    onDragStart: (event: React.DragEvent, nodeType: string, data: any) => void
}

export function LeftToolbar({ onDragStart }: LeftToolbarProps) {
    // Simplified toolbar items
    const toolbarItems = [
        {
            icon: Save,
            label: 'Save Macro',
            action: () => console.log('Save macro')
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
            secondary: true
        },
        {
            icon: UploadCloud,
            label: 'Publish Macro',
            action: () => console.log('Publish macro'),
            primary: true
        },
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
                                <item.icon className="w-5 h-5" />
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
            <div className="absolute top-2 left-2 z-10 space-y-2w-16 
                    bg-white border rounded-lg border-gray-200 p-2 flex 
                    flex-col space-y-2 overflow-y-auto font-sans">
                {paletteItems.map((category) => (
                    <div key={category.category} className="space-y-1">
                        {category.items.map((item) => (
                            <Tooltip key={item.type}>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        draggable
                                        onDragStart={(e) => onDragStart
                                            (e as any, item.type, item)}
                                        whileHover={{ scale: 1.05 }}
                                        className="w-10 h-10 border 
                                                border-gray-200 rounded-lg 
                                                cursor-move 
                                                hover:border-blue-300 bg-white 
                                                flex items-center 
                                                justify-center"
                                    >
                                        <item.icon className="w-4 h-4 
                                                text-gray-600" />
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
        </>
    )
} 