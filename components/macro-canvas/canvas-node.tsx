"use client"

import React from 'react'
import { Handle, Position } from '@xyflow/react'

interface CanvasNodeProps {
    nodeType: string
    children?: React.ReactNode
    isSelected?: boolean
    hasInput?: boolean
    hasOutput?: boolean
    className?: string
}

export function CanvasNode({
    nodeType,
    children,
    isSelected = false,
    hasInput = true,
    hasOutput = true,
    className = ''
}: CanvasNodeProps) {
    return (
        <div className={`canvas-node ${isSelected ? 'selected' : ''} ${className}`}>
            {/* Input Handle */}
            {hasInput && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className="canvas-handle"
                />
            )}

            {children || <DefaultContent nodeType={nodeType} />}

            {/* Output Handle */}
            {hasOutput && (
                <Handle
                    type="source"
                    position={Position.Right}
                    className="canvas-handle"
                />
            )}
        </div>
    )
}

function DefaultContent({ nodeType }: { nodeType: string }) {
    return (
        <>
            {/* Placeholder Intro Block */}
            <div className="intro-block">
                <p>Welcome to your personal system. Ask me anything or click the button below.</p>
                <button className="action-button">
                    {nodeType.includes('Agent') ? 'Ask Agent' : 'Run Macro'}
                </button>
            </div>

            {/* Input Field Block */}
            <div className="input-block">
                <label>Order ID</label>
                <input type="text" placeholder="Enter order ID" />
            </div>

            {/* Action Block */}
            <div className="action-block">
                <div className="action-content">
                    <span className="action-icon">⚙️</span>
                    <span className="action-label">Call Orders API</span>
                </div>
            </div>
        </>
    )
} 