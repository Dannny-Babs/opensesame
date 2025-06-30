"use client"

import * as React from "react"
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
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { DashboardSquare02Icon, RoboticIcon, WorkflowCircle05Icon, Settings05Icon, HeadsetIcon, GridIcon } from "@hugeicons/core-free-icons"


const data = {
    user: {
        name: "Daniel Babalola",
        email: "daniel@gmail.com",
        avatar: "/avatars/daniel.jpg",
    },

    navMain: [
        {
            name: "Overview",
            url: "/",
            icon: DashboardSquare02Icon,
        },
        {
            name: "Cells",
            url: "/dashboard",
            icon: RoboticIcon,
        },
        {
            name: "Macros",
            url: "/macros",
            icon: WorkflowCircle05Icon,
        },
    ],
    cells: [
        {
            name: "Orders",
            url: "#",
            icon: GridIcon,
        },
        {
            name: "Customers",
            url: "#",
            icon: GridIcon,
        },
        {
            name: "Products",
            url: "#",
            icon: GridIcon,
        },
        {
            name: "Inventory",
            url: "#",
            icon: GridIcon,
        },
        {
            name: "Sales",
            url: "#",
            icon: GridIcon,
        },
    ],

    settings: [
        {
            title: "Settings",
            url: "#",
            icon: Settings05Icon,
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
            icon: HeadsetIcon,
        },
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const [activeItem, setActiveItem] = useState<string | null>(null);

    // Set active item based on current route
    useEffect(() => {
        const currentItem = data.navMain.find(item => item.url === pathname)
        if (currentItem) {
            setActiveItem(currentItem.name)
        } else if (pathname === '/') {
            setActiveItem('Overview')
        }
    }, [pathname])

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };


    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="md:h-12 md:p-0 my-2">
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                                    <Image src="/logo.png" alt="OpenSesame Logo" width={40} height={40} className="object-contain w-10 h-10 align-middle " />
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
                <NavMain items={data.navMain} handleItemClick={handleItemClick} activeItem={activeItem} />
                <NavProjects cells={data.cells} handleItemClick={handleItemClick} activeItem={activeItem} />
                <NavSettings settings={data.settings} handleItemClick={handleItemClick} activeItem={activeItem} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
