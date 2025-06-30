"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { Comment03Icon } from '@hugeicons/core-free-icons'

export function TestAgentButton() {
    const handleTestAgent = () => {
        console.log('Test agent clicked')
        // Future: Implement test simulation logic
    }

    return (
        <Button
            className="absolute bottom-4 rounded-full right-4 z-10 bg-slate-600 text-white hover:bg-slate-700 font-sans"
            size="lg"
            onClick={handleTestAgent}
        >

            <HugeiconsIcon icon={Comment03Icon} strokeWidth={1.5} className="w-5 h-5" />
            Test Agent
        </Button>
    )
} 