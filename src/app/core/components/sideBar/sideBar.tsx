import * as React from "react"
import { SideBarSecondaryMenu } from "@/app/core/components/sideBar/sideBarSecondaryMenu"
import { SideBarUserData } from "@/app/core/components/sideBar/sideBarUserData"
import { 
  LayoutDashboardIcon, 
  BusFrontIcon,      
  UsersIcon, 
  MapPinnedIcon,     
  Building2Icon,    
  UserCogIcon,       
  Settings2Icon, 
  CommandIcon, 
} from "lucide-react"
import { SideBarMainMenu } from "./sideBarMainMenu"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "لوحة المعلومات",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "الرحلات", 
      url: "/trips",
      icon: <BusFrontIcon />, 
    },
    {
      title: "الركاب", 
      url: "/passengers",
      icon: <UsersIcon />,
    },
    {
      title: "الخطوط",
      url: "/routes",
      icon: <MapPinnedIcon />, 
    },
    {
      title: "الفروع", 
      url: "/branches",
      icon: <Building2Icon />,
    },
    {
      title: "المستخدمون", 
      url: "/users",
      icon: <UserCogIcon />,
    },
  ],
  navSecondary: [
    {
      title: "الإعدادات",
      url: "/settings",
      icon: <Settings2Icon />,
    },
  ],
}

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" side="right" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SideBarMainMenu items={data.navMain} />
        <SideBarSecondaryMenu items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SideBarUserData user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
