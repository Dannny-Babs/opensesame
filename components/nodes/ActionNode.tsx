'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';

interface ActionNodeData {
    label: string;
}

export default function ActionNode({ data, selected }: NodeProps<ActionNodeData>) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`
        px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
        text-white rounded-lg shadow-lg border-2 min-w-[150px]
        ${selected ? 'border-yellow-400 shadow-xl' : 'border-blue-400'}
        hover:shadow-xl transition-all duration-200
      `}
        >
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 !bg-blue-200 !border-2 !border-blue-600"
            />

            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div>
                    <div className="text-xs uppercase tracking-wide opacity-80 font-medium">Action</div>
                    <div className="font-semibold">{data.label}</div>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 !bg-blue-200 !border-2 !border-blue-600"
            />
        </motion.div>
    );
} 