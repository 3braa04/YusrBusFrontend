import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useLoggedInUser } from "../../contexts/loggedInUserContext";
import { SystemPermissions } from "../../auth/systemPermissions";
import { SystemPermissionsResources } from "../../auth/systemPermissionsResources";
import { SystemPermissionsActions } from "../../auth/systemPermissionsActions";

export function SideBarMainMenu({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    hasAuth: boolean;
  }[];
}) {
  return (
    <SidebarGroup className="mt-5">
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {items.map(
            (item) =>
              item.hasAuth && (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      to={item.url}
                      className="flex items-center justify-start gap-3 w-full px-3"
                    >
                      <span className="flex items-center justify-center shrink-0 size-4">
                        {item.icon}
                      </span>

                      <span className="font-medium truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
