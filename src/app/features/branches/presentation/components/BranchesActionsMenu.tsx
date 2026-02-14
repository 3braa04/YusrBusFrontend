import { Button } from "@/components/ui/button";
import {
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import type BranchDTO from "../../data/branch_dto";
import EditBranchDialog from "./ChangeBranchDialog";

type ListType = "dropdown" | "context";

export default function BranchesActionsMenu({branch, type}: {branch: BranchDTO, type: ListType})
{
    const [isEditDialogOpen, setOpenEditDialogState] = useState(false);

    return (
        <>
            {type === "dropdown" && (
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
            )}
            
            {type === "context" && (
                <ContextMenuContent>
                    <ContextMenuGroup>
                    <ContextMenuLabel>الإجراءات</ContextMenuLabel>
                    <ContextMenuSeparator></ContextMenuSeparator>

                    <ContextMenuItem
                        onSelect={() => {
                        setOpenEditDialogState(true);
                        }}
                    >
                        تعديل
                    </ContextMenuItem>

                    <ContextMenuItem className="text-destructive">حذف</ContextMenuItem>
                    </ContextMenuGroup>
                </ContextMenuContent>
            )}

            <Dialog open={isEditDialogOpen} onOpenChange={setOpenEditDialogState}>
                <DialogContent dir="rtl" className="sm:max-w-sm">
                <EditBranchDialog branch={branch} type="update" />
                </DialogContent>
            </Dialog>
        </>
    );
}