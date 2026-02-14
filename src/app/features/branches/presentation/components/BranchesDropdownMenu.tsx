import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import type BranchDTO from "../../data/branch_dto";
import EditBranchDialog from "./ChangeBranchDialog";


export default function BranchesDropdownMenu({branch}: {branch: BranchDTO})
{
    const [isEditDialogOpen, setOpenEditDialogState] = useState(false);

    return (
        <>
            <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem 
                onSelect={() => {
                    setOpenEditDialogState(true);
                }}
                >تعديل</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                    حذف
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isEditDialogOpen} onOpenChange={setOpenEditDialogState}>
                <form>
                    <DialogContent dir="rtl" className="sm:max-w-sm">
                    <EditBranchDialog branch={branch} type="update" />
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}