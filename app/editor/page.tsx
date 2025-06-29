'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import '@xyflow/react/dist/style.css';
import Sidebar from '../../components/Sidebar';

const FlowCanvas = dynamic(() => import('../../components/FlowCanvas'), { ssr: false });

export default function Editor() {
    return (
        <div className="h-screen bg-gray-50">
            <div className="h-full flex flex-col">
                <header className="bg-white shadow-sm border-b p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            ← Back to Home
                        </Link>
                        <h1 className="text-xl font-semibold text-gray-800">Visual Macro Builder</h1>
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            Save Flow
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Export JSON
                        </button>
                    </div>
                </header>
                <div className="flex-1 flex">
                    <Sidebar />
                    <div className="flex-1">
                        <FlowCanvas />
                    </div>
                </div>
            </div>
        </div>
    );
} 