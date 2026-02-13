import * as React from "react";
import { SideBarSecondaryMenu } from "@/app/core/components/sideBar/sideBarSecondaryMenu";
import { SideBarUserData } from "@/app/core/components/sideBar/sideBarUserData";
import {
  LayoutDashboardIcon,
  BusFrontIcon,
  UsersIcon,
  MapPinnedIcon,
  Building2Icon,
  UserCogIcon,
  Settings2Icon,
  CommandIcon,
} from "lucide-react";
import { SideBarMainMenu } from "./sideBarMainMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ApplicationLang from "../../Services/LangService/ApplicationLang";
const appLang = ApplicationLang.getAppLangText();  
const appLangSections = appLang.sections;
const data = {
  user: {
    name: "Baraa Barmo",
    email: "Barrrr@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: appLangSections.dashboard,
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: appLangSections.trips,
      url: "/trips",
      icon: <BusFrontIcon />,
    },
    {
      title: appLangSections.passengers,
      url: "/passengers",
      icon: <UsersIcon />,
    },
    {
      title: appLangSections.routes,
      url: "/routes",
      icon: <MapPinnedIcon />,
    },
    {
      title: appLangSections.branches,
      url: "/branches",
      icon: <Building2Icon />,
    },
    {
      title: appLangSections.users,
      url: "/users",
      icon: <UserCogIcon />,
    },
  ],
  navSecondary: [
    {
      title: appLangSections.settings,
      url: "/settings",
      icon: <Settings2Icon />,
    },
  ],
};

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
                <span className="text-base font-semibold">
                  {appLang.companyName}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SideBarMainMenu items={data.navMain} />
        <SideBarSecondaryMenu
          items={data.navSecondary}
          className="pt-10 mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <SideBarUserData user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
