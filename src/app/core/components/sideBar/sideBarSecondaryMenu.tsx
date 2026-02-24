"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import UserBranchesSelect from "../select/userBranchesSelect"
import { ThemeToggle } from "../theme/themeToggle"

export function SideBarSecondaryMenu({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url} className="flex items-center justify-start gap-3 w-full px-3">

                  <span className="flex items-center justify-center shrink-0 size-4">
                    {item.icon}
                  </span>
                  
                  <span className="font-medium truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem>
              <UserBranchesSelect/>
          </SidebarMenuItem>

          <SidebarMenuItem>
              <ThemeToggle variant="sidebar"/>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
