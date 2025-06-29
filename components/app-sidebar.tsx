"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Settings2,
    SquareTerminal,
    HelpCircle,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSettings } from "@/components/nav-settings"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
    user: {
        name: "Daniel Babalola",
        email: "daniel@gmail.com",
        avatar: "/avatars/daniel.jpg",
    },

    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },

    ],
    cells: [
        {
            name: "Orders",
            url: "#",
            icon: Bot,
        },
        {
            name: "Customers",
            url: "#",
            icon: Bot,
        },
        {
            name: "Products",
            url: "#",
            icon: Bot,
        },
        {
            name: "Inventory",
            url: "#",
            icon: Bot,
        },
        {
            name: "Sales",
            url: "#",
            icon: Bot,
        },
    ],

    settings: [
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            name: "Help & Support",
            url: "#",
            icon: HelpCircle,
        },
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="md:h-12 md:p-0 my-2">
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                                    <Image src="/logo.png" alt="Daniel Babalola" width={48} height={48} />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight font-sans">
                                    <span className="truncate text-xs">Workspace</span>
                                    <span className="text-lg  font-semibold tracking-tight">OpenSesame</span>

                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects cells={data.cells} />
                <NavSettings settings={data.settings} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
