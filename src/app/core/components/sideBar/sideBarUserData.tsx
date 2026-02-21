import type User from "@/app/features/Users/Data/User"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { CircleUserRoundIcon, EllipsisVerticalIcon, LogOutIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../../Auth/AuthContext"
import ApiConstants from "../../Networking/ApiConstants"
import YusrApiHelper from "../../Networking/YusrApiHelper"
import RoutesService from "../../Services/constants/RoutesService"
import ApplicationLang from "../../Services/LangService/ApplicationLang"

export function SideBarUserData({
  user,
}: {
  user: Partial<User> | undefined
}) {
  
  const {logout} = useAuth();
  const { isMobile } = useSidebar();
  const sideBarUserDataLang = ApplicationLang.getAppLangText().sideBarUserData;
  
  const LogoutHandler = async() => {
    let result = await YusrApiHelper.Post(
      `${ApiConstants.baseUrl}/Logout`
    );

    if(result.status === 200 || result.status === 204){
      logout();
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src="/avatars/shadcn.jpg" alt={user?.username} />
                <AvatarFallback className="rounded-lg">YSR</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">{user?.username}</span>
              </div>
              <EllipsisVerticalIcon className="ms-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/avatars/shadcn.jpg" alt={user?.username} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUserRoundIcon
                />
                <Link to={RoutesService.Profile}>
                {sideBarUserDataLang.account}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={LogoutHandler}>
              <LogOutIcon
              />
              {sideBarUserDataLang.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
