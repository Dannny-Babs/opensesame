"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Play, Edit, Copy, Trash2, Activity } from 'lucide-react'

export default function MacrosPage() {
    const macros = [
        {
            id: 1,
            name: 'Welcome Flow',
            description: 'Automated onboarding sequence for new users',
            status: 'active',
            lastRun: '2 hours ago',
            executions: 45
        },
        {
            id: 2,
            name: 'Order Processing',
            description: 'Handle customer orders and send notifications',
            status: 'active',
            lastRun: '30 minutes ago',
            executions: 128
        },
        {
            id: 3,
            name: 'Email Campaign',
            description: 'Send marketing emails to segmented audiences',
            status: 'paused',
            lastRun: '1 day ago',
            executions: 89
        }
    ]

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Macros Dashboard</h1>
                <p className="text-gray-600">Manage and monitor your automated workflows</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-2xl font-bold mb-1">24</h3>
                    <p className="text-gray-600">Total Macros</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-2xl font-bold text-green-600 mb-1">18</h3>
                    <p className="text-gray-600">Active Workflows</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-2xl font-bold text-blue-600 mb-1">1,247</h3>
                    <p className="text-gray-600">Total Executions</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Macros</h2>
                    <Button>
                        <Activity className="h-4 w-4 mr-2" />
                        View All Activity
                    </Button>
                </div>

                <div className="space-y-4">
                    {macros.map((macro) => (
                        <div key={macro.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-medium text-gray-900">{macro.name}</h3>
                                        <span className={`px-2 py-1 text-xs rounded-full ${macro.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {macro.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-3">{macro.description}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>Last run: {macro.lastRun}</span>
                                        <span>•</span>
                                        <span>{macro.executions} executions</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button size="sm" variant="outline">
                                        <Play className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 