"use client"

import React from 'react'
import { CanvasNode } from './canvas-node'
import { Input } from '../ui/input'

interface NodeProps {
    data: {
        label?: string
        [key: string]: string | number | boolean | object | null | undefined
    }
    selected?: boolean
    setData?: (data: { [key: string]: string | number | boolean | object | null | undefined }) => void
}

// Shared class for all nodes
const BASE_NODE_CLASSES =
    "font-sans text-sm border border-slate-200 bg-white rounded-md shadow-sm overflow-hidden"

// Header overrides
const HEADER_CLASSES =
    "px-3 py-1 bg-slate-50 border-b border-slate-200 font-semibold tracking-tight text-gray-700 text-sm"

// Common blocks
const IntroBlock = ({ children }: { children: React.ReactNode }) => (
    <div className="p-3 bg-white rounded-sm">{children}</div>
)

const InputBlock = ({ label, placeholder }: { label: string; placeholder: string }) => (
    <div className="p-3 flex flex-col gap-1">
        <label className="text-sm text-gray-600 font-semibold font-sans">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            className="h-10 px-2 border border-slate-200 rounded-md text-sm"
        />
    </div>
)

const ActionBlock = ({ label }: { label: string }) => (
    <div className="p-2 bg-slate-100 flex items-center justify-between border border-slate-200 rounded-md px-3 m-2">
        <span className="text-sm text-gray-800">{label}</span>
        <div className="w-2 h-2 bg-slate-300 rounded-full" />
    </div>
)

export const nodeTypes = {
    apiAgent: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="API Agent"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>API Agent</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Execute any REST or GraphQL call with your service APIs.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Configure API
                </button>
            </IntroBlock>

            <InputBlock label="Endpoint" placeholder="GET /orders/{id}" />
            <ActionBlock label="Test Call" />
        </CanvasNode>
    ),

    llmAgent: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="LLM Agent"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>LLM Agent</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Process natural language inputs and generate AI responses.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Edit Prompt
                </button>
            </IntroBlock>

            <InputBlock
                label="Prompt Template"
                placeholder="Analyze this customer request..."
            />
            <ActionBlock label="Run AI" />
        </CanvasNode>
    ),

    webhookAgent: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="Webhook Agent"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>Webhook Agent</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Listen for webhook events and trigger responses.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Configure URL
                </button>
            </IntroBlock>

            <InputBlock label="Webhook URL" placeholder="/webhook/orders" />
            <ActionBlock label="Test Webhook" />
        </CanvasNode>
    ),

    decision: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="Decision"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>Decision</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Route your flow with if/else logic based on data or AI outputs.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Set Conditions
                </button>
            </IntroBlock>

            <InputBlock
                label="Condition"
                placeholder="order.status === 'pending'"
            />
            <ActionBlock label="Evaluate" />
        </CanvasNode>
    ),

    loop: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="Loop"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>Loop</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Repeat actions for each item in a collection or until a condition is met.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Configure Loop
                </button>
            </IntroBlock>

            <InputBlock label="Collection" placeholder="orders.items" />
            <ActionBlock label="Iterate" />
        </CanvasNode>
    ),

    parallel: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="Parallel"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>Parallel</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Execute multiple actions simultaneously to improve performance.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Configure Parallel
                </button>
            </IntroBlock>

            <InputBlock label="Actions" placeholder="Send email, Update database" />
            <ActionBlock label="Run Parallel" />
        </CanvasNode>
    ),

    kbLookup: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="Knowledge Base"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>Knowledge Base</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Search your knowledge base for relevant information and context.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Search KB
                </button>
            </IntroBlock>

            <InputBlock label="Query" placeholder="customer support policies" />
            <ActionBlock label="Search" />
        </CanvasNode>
    ),

    dbQuery: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="Database Query"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>Database Query</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Execute database queries to retrieve or update data in your system.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Run Query
                </button>
            </IntroBlock>

            <InputBlock label="SQL Query" placeholder="SELECT * FROM orders WHERE..." />
            <ActionBlock label="Execute" />
        </CanvasNode>
    ),

    cache: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="Cache/State"
            isSelected={selected}
            className={BASE_NODE_CLASSES}
        >
            <div className={HEADER_CLASSES}>Cache/State</div>

            <IntroBlock>
                <p className="text-gray-700">
                    Store and retrieve data temporarily to optimize workflow performance.
                </p>
                <button className="mt-2 inline-block px-3 py-1 border border-slate-300 rounded text-sm">
                    Manage Cache
                </button>
            </IntroBlock>

            <InputBlock label="Cache Key" placeholder="user_preferences_{{user_id}}" />
            <ActionBlock label="Cache Data" />
        </CanvasNode>
    ),

    note: ({ data, selected, setData }: NodeProps) => (
        <CanvasNode
            nodeType="Note"
            isSelected={selected}
            hasInput={false}
            hasOutput={false}
        >
            <div className="py-1  font-semibold tracking-tight text-gray-700 text-sm">Note</div>
            <input
                type="text"
                placeholder="Add a note..."
                className="h-10 px-2 border border-slate-200 rounded-md text-sm bg-white font-sans w-full"
                value={(data.note as string) || ''}
                onBlur={(e) => setData && setData({ ...data, note: e.target.value })}
            />

        </CanvasNode>
    ),

    comment: ({ selected }: NodeProps) => (
        <CanvasNode
            nodeType="Comment"
            isSelected={selected}
            hasInput={false}
            hasOutput={false}
            className={`${BASE_NODE_CLASSES} w-96`}
        >
            <div className={HEADER_CLASSES}>Comment</div>
            <div className='p-3 flex flex-col gap-1'>
                <Input placeholder="Review this logic with the team..." className='h-10 px-2 border border-slate-200 rounded-md text-sm' />
                <button className="mt-2 inline-block px-3 py-2 bg-slate-500 rounded text-xs text-white">
                    Add Comment
                </button>
            </div>
        </CanvasNode>
    ),
} 