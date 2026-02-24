import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Building2, ChevronsUpDown } from "lucide-react";
import { useLoggedInUser } from "../../contexts/loggedInUserContext";

export default function UserBranchesSelect()
{
    const { loggedInUser, activeBranch, setActiveBranch } = useLoggedInUser();

    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-start gap-3">
                    <Building2 className="h-4 w-4" />
                    <span className="truncate text-base">
                        {activeBranch?.branchName || "اختر الفرع"}
                    </span>
                    <ChevronsUpDown className="h-2 w-2 shrink-0 opacity-50 ltr:ml-2 rtl:mr-2" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {loggedInUser?.userBranches?.map((branch) => (
                    <DropdownMenuItem 
                        key={branch.branchId} 
                        onClick={() => setActiveBranch(branch)}
                        className={activeBranch?.branchId === branch.branchId ? "bg-secondary" : ""}
                    >
                        {branch.branchName}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
