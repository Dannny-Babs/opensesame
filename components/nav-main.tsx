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

export function NavMain({
    items,
    handleItemClick,
    activeItem,
}: {
    items: {
        name: string
        url: string
        icon?: any
        items?: {
            title: string
            url: string
        }[]
    }[]
    handleItemClick: (item: string) => void
    activeItem: string | null
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="font-sans">Platform</SidebarGroupLabel>
            <SidebarMenu className="font-sans">
                {items.map((item) => {
                    const isActive = activeItem === item.name;
                    return (
                        <SidebarMenuItem key={item.name} className="font-sans">
                            {item.items ? (
                                <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.name}
                                                isActive={isActive}
                                                onClick={() => handleItemClick(item.name)}
                                            >
                                                {item.icon && <HugeiconsIcon icon={item.icon} strokeWidth={1.5} className="w-5 h-5" />}
                                                <span>{item.name}</span>
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
                                </Collapsible>
                            ) : (
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.name}
                                    isActive={isActive}
                                    onClick={() => handleItemClick(item.name)}
                                >
                                    <a href={item.url}>
                                        {item.icon && <HugeiconsIcon icon={item.icon} strokeWidth={1.5} className="w-5 h-5" />}
                                        <span>{item.name}</span>
                                    </a>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
