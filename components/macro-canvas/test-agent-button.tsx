"use client"

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TestAgentButton() {
    const handleTestAgent = () => {
        console.log('Test agent clicked')
        // Future: Implement test simulation logic
    }

    return (
        <Button
            className="absolute bottom-4 rounded-full right-4 z-10 bg-blue-600 text-white hover:bg-blue-700 font-sans"
            size="lg"
            onClick={handleTestAgent}
        >
            <MessageCircle className="w-4 h-4 " />
            Test Agent
        </Button>
    )
} 