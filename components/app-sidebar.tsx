"use client"

import * as React from "react"
import {

    Bot,
    Settings2,
    Headset,
    Home,
    Workflow,
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
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"


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
            icon: Home,
        },
        {
            name: "Cells",
            url: "/dashboard",
            icon: Bot,
        },
        {
            name: "Macros",
            url: "/macros",
            icon: Workflow,
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
            icon: Headset,
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
