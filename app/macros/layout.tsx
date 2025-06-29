
"use client"

import { NestedSidebar } from "@/components/nested-sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { useEffect } from "react"

function MacrosLayoutContent({ children }: { children: React.ReactNode }) {
    const { setOpen } = useSidebar()

    useEffect(() => {
        // Force collapse the main sidebar when entering macros page
        setOpen(false)
    }, [setOpen])

    return (
        <div className="flex-1 flex">
            <NestedSidebar />
            <main className="flex-1 bg-gray-50">
                {children}
            </main>
        </div>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <MacrosLayoutContent>{children}</MacrosLayoutContent>
}