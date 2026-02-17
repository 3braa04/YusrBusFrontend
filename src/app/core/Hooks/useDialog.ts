import { useState } from "react";

export default function useDialog<T>()
{
      const [activeBranch, setActiveBranch] = useState<T | null>(null);
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
      const openEditDialog = (branch: T) => {
        setActiveBranch(branch);
        setIsEditDialogOpen(true);
      };
    
      const openDeleteDialog = (branch: T) => {
        setActiveBranch(branch);
        setIsDeleteDialogOpen(true);
      };


      return {activeBranch, isEditDialogOpen, isDeleteDialogOpen,setIsEditDialogOpen, setIsDeleteDialogOpen, openEditDialog, openDeleteDialog}
}