"use client"

import { ChevronRight } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"

export function NavSettings({
    settings,
    activeItem,
    handleItemClick,
}: {
    settings: {
        title?: string
        name?: string
        url: string
        icon?: any
        items?: {
            title: string
            url: string
        }[]
    }[]
    activeItem: string | null
    handleItemClick: (item: string) => void
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
                {settings.map((item) => (
                    <Collapsible
                        key={item.title || item.name}
                        asChild
                        defaultOpen={activeItem === (item.name || item.title)}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            {item.items ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={item.title || item.name}
                                            isActive={activeItem === (item.name || item.title)}
                                            onClick={() => handleItemClick(item.name || item.title || '')}
                                        >
                                            {item.icon && <HugeiconsIcon icon={item.icon} strokeWidth={1.5} className="w-5 h-5" />}
                                            <span>{item.title || item.name}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : (
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title || item.name}
                                    isActive={activeItem === (item.name || item.title)}
                                    onClick={() => handleItemClick(item.name || item.title || '')}
                                >
                                    <a href={item.url}>
                                        {item.icon && <HugeiconsIcon icon={item.icon} strokeWidth={1.5} className="w-6 h-6" />}
                                        <span>{item.title || item.name}</span>
                                    </a>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
} 