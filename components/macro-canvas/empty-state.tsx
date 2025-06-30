"use client"

import React from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface EmptyStateProps {
    visible: boolean
}

export function EmptyState({ visible }: EmptyStateProps) {
    if (!visible) return null

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-sans">
            <div className="text-center">
                <div className="border-1 shadow border-gray-300 rounded-xl p-8 bg-white">
                    <Image src="/illustrations/macros-empty.png" alt="Empty state" width={150} height={150} className="mb-6 mx-auto" />
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-3">No macros created</h3>
                    <p className="text-gray-500 mb-4 text-sm max-w-sm mx-auto"> Automate repetitive tasks by creating your first workflow. It only takes a minute.</p>
                    <Button className="pointer-events-auto py-6 w-2/3 text-md">
                        <PlusCircle className="w-5 h-5 " />
                        Create Your First Macro
                    </Button>
                </div>
            </div>
        </div>
    )
} 