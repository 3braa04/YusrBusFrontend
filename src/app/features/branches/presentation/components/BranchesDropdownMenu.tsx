import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import EditBranchDialog from "./edit_branch_dialog";


export default function BranchesDropdownMenu()
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
                    <DialogHeader>
                        <DialogTitle>تعديل الفرع</DialogTitle>
                    </DialogHeader>
                    <EditBranchDialog />
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}