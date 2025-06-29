"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Plus, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSidebar } from "@/components/ui/sidebar"
import { motion } from "framer-motion"

interface NestedSidebarProps {
    title?: string
    items?: Array<{
        id: string
        name: string
        description?: string
        icon?: React.ReactNode
        onClick?: () => void
    }>
}

export function NestedSidebar({
    title = "Macros",
    items = []
}: NestedSidebarProps) {
    const { toggleSidebar, state } = useSidebar()
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    const defaultItems = [
        {
            id: "1",
            name: "Welcome Flow",
            description: "Onboard new users",
            icon: "🎉"
        },
        {
            id: "2",
            name: "Order Processing",
            description: "Handle customer orders",
            icon: "📦"
        },
        {
            id: "3",
            name: "Email Campaign",
            description: "Send marketing emails",
            icon: "📧"
        },
        {
            id: "4",
            name: "Data Sync",
            description: "Sync customer data",
            icon: "🔄"
        }
    ]

    const displayItems = items.length > 0 ? items : defaultItems

    return (
        <motion.div
            className={`
        bg-white border-r border-gray-200 h-full flex flex-col
        ${isCollapsed ? 'w-16' : 'w-80'}
        transition-all duration-300 ease-in-out
      `}
            initial={false}
            animate={{ width: isCollapsed ? 64 : 320 }}
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        <p className="text-sm text-gray-500">Manage your workflows</p>
                    </motion.div>
                )}

                <div className="flex items-center space-x-2">
                    {/* Toggle Main Sidebar */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        className="h-8 w-8 p-0"
                        title={state === "collapsed" ? "Expand main sidebar" : "Collapse main sidebar"}
                    >
                        {state === "collapsed" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>

                    {/* Toggle Nested Sidebar */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="h-8 w-8 p-0"
                        title={isCollapsed ? "Expand panel" : "Collapse panel"}
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {!isCollapsed && (
                <>
                    {/* Search and Actions */}
                    <div className="p-4 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search macros..."
                                className="pl-10"
                            />
                        </div>

                        <Button className="w-full" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Macro
                        </Button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto px-4">
                        <div className="space-y-2">
                            {displayItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                                    onClick={item.onClick}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="text-2xl">{item.icon}</div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {item.name}
                                            </h3>
                                            {item.description && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                    </div>
                </>
            )}

            {isCollapsed && (
                <div className="flex flex-col items-center py-4 space-y-3">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </motion.div>
    )
} 