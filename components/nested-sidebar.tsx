"use client"

import * as React from "react"
import { Plus, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { motion } from "framer-motion"

interface MacroCategory {
    id: string
    name: string
    onClick?: () => void
    macros: Array<{
        id: string
        name: string
        onClick?: () => void
    }>
}

interface NestedSidebarProps {
    title?: string
    categories?: MacroCategory[]
}

export function NestedSidebar({
    title = "Macros",
    categories = []
}: NestedSidebarProps) {
    const [openCategories, setOpenCategories] = React.useState<string[]>([])

    const defaultCategories: MacroCategory[] = [
        {
            id: "order-processing",
            name: "Order Processing",
            onClick: () => console.log("Order Processing category clicked"),
            macros: [
                { id: "ship-order", name: "Ship Order Macro", onClick: () => console.log("Ship Order clicked") },
                { id: "cancel-order", name: "Cancel Order Macro", onClick: () => console.log("Cancel Order clicked") },
                { id: "bulk-refund", name: "Bulk Refund Macro", onClick: () => console.log("Bulk Refund clicked") }
            ]
        },
        {
            id: "inventory-management",
            name: "Inventory Management",
            onClick: () => console.log("Inventory Management category clicked"),
            macros: [
                { id: "low-stock-alert", name: "Low Stock Alert Macro", onClick: () => console.log("Low Stock Alert clicked") },
                { id: "auto-restock", name: "Auto-Restock Macro", onClick: () => console.log("Auto-Restock clicked") },
                { id: "inventory-audit", name: "Inventory Audit Macro", onClick: () => console.log("Inventory Audit clicked") }
            ]
        },
        {
            id: "notifications",
            name: "Notifications",
            onClick: () => console.log("Notifications category clicked"),
            macros: [
                { id: "email-welcome", name: "Email Welcome Flow", onClick: () => console.log("Email Welcome clicked") },
                { id: "payment-reminder", name: "Payment Reminder Flow", onClick: () => console.log("Payment Reminder clicked") },
                { id: "sla-breach", name: "SLA Breach Alert Flow", onClick: () => console.log("SLA Breach clicked") }
            ]
        },
        {
            id: "shipping-logistics",
            name: "Shipping & Logistics",
            onClick: () => console.log("Shipping & Logistics category clicked"),
            macros: [
                { id: "schedule-pickup", name: "Schedule Pickup Macro", onClick: () => console.log("Schedule Pickup clicked") },
                { id: "update-tracking", name: "Update Tracking Macro", onClick: () => console.log("Update Tracking clicked") },
                { id: "confirm-delivery", name: "Confirm Delivery Macro", onClick: () => console.log("Confirm Delivery clicked") }
            ]
        }
    ]

    const displayCategories = categories.length > 0 ? categories : defaultCategories

    const toggleCategory = (categoryId: string) => {
        setOpenCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        )
    }

    return (
        <div className="bg-white border-r font-sans border-gray-200 h-full flex flex-col w-64">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h2>
                <p className="text-xs text-gray-500">Manage your AI agent workflows</p>
            </div>

            {/* Search and Actions */}
            <div className="p-4 space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search macros..."
                        className="pl-10"
                    />
                </div>

                <Button className="w-full bg-slate-700 text-white hover:bg-slate-800 h-9" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Macro
                </Button>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="space-y-1">
                    {displayCategories.map((category) => (
                        <Collapsible
                            key={category.id}
                            open={openCategories.includes(category.id)}
                            onOpenChange={() => toggleCategory(category.id)}
                        >
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-between p-2 h-auto font-medium text-sm hover:bg-gray-100"
                                    onClick={() => {
                                        if (category.onClick) {
                                            category.onClick();
                                        }
                                    }}
                                >
                                    <span>{category.name}</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${openCategories.includes(category.id) ? 'rotate-180' : ''
                                        }`} />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1">
                                {category.macros.map((macro) => (
                                    <motion.button
                                        key={macro.id}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full text-left pl-6 pr-2 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                                        onClick={macro.onClick}
                                    >
                                        {macro.name}
                                    </motion.button>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>
            </div>
        </div>
    )
} 