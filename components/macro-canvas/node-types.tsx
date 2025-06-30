"use client"

import React from 'react'
import {
    Settings,
    Database,
    Bot,
    Bell,
    BookOpen,
    Repeat,
    GitBranch,
    HardDrive,
    FileText,
    ListChecks,
    MessageSquare
} from 'lucide-react'

// Custom node types for the canvas
export const nodeTypes = {
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