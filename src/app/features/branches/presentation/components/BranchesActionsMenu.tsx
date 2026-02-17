import DeleteDialog from "@/app/core/components/Dialogs/DeleteDialog";
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
import type Branch from "../../data/Branch";
import ChangeBranchDialog from "./ChangeBranchDialog";

type ListType = "dropdown" | "context";

interface Props {
    branch: Branch;
    type: ListType;
    onSuccess?: (newData: Branch) => void;
}

export default function BranchesActionsMenu({ branch, type, onSuccess }: Props)
{
    const [isEditDialogOpen, setOpenEditDialogState] = useState(false);
    const [isDeleteDialogOpen, setOpenDeleteDialogState] = useState(false);

    const handleUpdateSuccess = (newData: Branch) => {
        setOpenEditDialogState(false); 
        onSuccess?.(newData);
    };

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
                    <DropdownMenuItem className="text-destructive"
                        onSelect={() => {
                            setOpenDeleteDialogState(true);
                        }}
                    >
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

                        <ContextMenuItem className="text-destructive"
                            onSelect={() => {
                                setOpenDeleteDialogState(true);
                            }}
                        >
                            حذف
                        </ContextMenuItem>

                    </ContextMenuGroup>

                </ContextMenuContent>
            )}
            {isEditDialogOpen && 
            <Dialog open={isEditDialogOpen} onOpenChange={setOpenEditDialogState}>
                <ChangeBranchDialog branch={branch} type="update" onSuccess={handleUpdateSuccess} />
            </Dialog>
            }
            {isDeleteDialogOpen && 
            <Dialog open={isDeleteDialogOpen} onOpenChange={setOpenDeleteDialogState}>
                <DialogContent dir="rtl" className="sm:max-w-sm">
                    <DeleteDialog entityName="الفرع"/>
                </DialogContent>
            </Dialog>
            }
        </>
    );
}