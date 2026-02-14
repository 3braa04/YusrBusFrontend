import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditBranchDialog from "./edit_branch_dialog";

export default function BranchesContextContent() {
  
  const [willOpenDialog, setOpenDialogState] = useState(false);

  return (
    <>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>الإجراءات</ContextMenuLabel>
          <ContextMenuSeparator></ContextMenuSeparator>

          <ContextMenuItem
            onSelect={() => {
              setOpenDialogState(true);
            }}
          >
            تعديل
          </ContextMenuItem>

          <ContextMenuItem className="text-destructive">حذف</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>

      <Dialog open={willOpenDialog} onOpenChange={setOpenDialogState}>
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
