import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { useState } from "react";
import type BranchDTO from "../../data/branch_dto";
import EditBranchDialog from "./ChangeBranchDialog";

export default function BranchesContextContent({branch}: {branch: BranchDTO}) {
  
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
            <EditBranchDialog branch={branch} type="update" />
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
