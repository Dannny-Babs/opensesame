'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';

interface ConditionNodeData {
    label: string;
}

export default function ConditionNode({ data, selected }: NodeProps<ConditionNodeData>) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`
        px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 
        text-white rounded-lg shadow-lg border-2 min-w-[150px]
        ${selected ? 'border-yellow-300 shadow-xl' : 'border-amber-300'}
        hover:shadow-xl transition-all duration-200
        transform rotate-45
      `}
        >
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 !bg-amber-200 !border-2 !border-amber-600"
            />

            <div className="flex items-center space-x-2 transform -rotate-45">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div>
                    <div className="text-xs uppercase tracking-wide opacity-80 font-medium">Condition</div>
                    <div className="font-semibold">{data.label}</div>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 !bg-amber-200 !border-2 !border-amber-600"
            />

            {/* Additional handles for Yes/No paths */}
            <Handle
                type="source"
                position={Position.Bottom}
                id="yes"
                className="w-3 h-3 !bg-green-400 !border-2 !border-green-600"
            />
            <Handle
                type="source"
                position={Position.Top}
                id="no"
                className="w-3 h-3 !bg-red-400 !border-2 !border-red-600"
            />
        </motion.div>
    );
} 