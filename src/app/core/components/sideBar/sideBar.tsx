
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import {
  Building2Icon,
  BusFrontIcon,
  LayoutDashboardIcon,
  MapPinnedIcon,
  Settings2Icon,
  UserCogIcon,
  UsersIcon
} from "lucide-react";
import * as React from "react";
import ApplicationLang from "../../Services/LangService/ApplicationLang";
import SidebarLogo from "./SidebarLogo";
import { SideBarCompanyData } from "./sideBarCompanyData";
import { SideBarMainMenu } from "./sideBarMainMenu";
import { SideBarSecondaryMenu } from "./sideBarSecondaryMenu";
import { SideBarUserData } from "./sideBarUserData";
import { useCompany } from "../../Contexts/CompanyContext";
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

  const { companyData } = useCompany();

  const displayCompany = {
    name: companyData?.companyName || "Default Name",
    logo: companyData?.logo?.url || "/default-avatar.jpg",
  };
  
  return (
    <Sidebar collapsible="icon" side="right" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            
            <SidebarLogo/>

            <SideBarCompanyData company={displayCompany} />

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SideBarMainMenu items={data.navMain} />
        <SideBarSecondaryMenu
          items={data.navSecondary}
          className="pt-10 mt-auto text-center"
        />
      </SidebarContent>
      <SidebarFooter>
        <SideBarUserData user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
