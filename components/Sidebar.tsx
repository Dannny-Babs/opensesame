'use client';

import React from 'react';
import { motion } from 'framer-motion';

const nodeTypes = [
    {
        type: 'action',
        label: 'Action Node',
        description: 'Perform an action',
        color: 'from-blue-500 to-blue-600',
        icon: '⚡',
    },
    {
        type: 'condition',
        label: 'Condition Node',
        description: 'Add decision logic',
        color: 'from-amber-400 to-orange-500',
        icon: '❓',
    },
];

export default function Sidebar() {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-full p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Node Library</h3>

            <div className="space-y-3">
                {nodeTypes.map((node) => (
                    <motion.div
                        key={node.type}
                        draggable
                        onDragStart={(event) => onDragStart(event as any, node.type)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
              p-3 rounded-lg cursor-move shadow-md border-2 border-transparent
              bg-gradient-to-r ${node.color} text-white
              hover:shadow-lg transition-all duration-200
            `}
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{node.icon}</span>
                            <div>
                                <div className="font-medium">{node.label}</div>
                                <div className="text-xs opacity-80">{node.description}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8">
                <h4 className="text-md font-medium text-gray-700 mb-3">Instructions</h4>
                <div className="text-sm text-gray-600 space-y-2">
                    <p>• Drag nodes from here onto the canvas</p>
                    <p>• Connect nodes by dragging from connection points</p>
                    <p>• Click nodes to select and move them</p>
                    <p>• Use the minimap to navigate large flows</p>
                </div>
            </div>
        </div>
    );
} 