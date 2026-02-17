import { useState } from "react";

export default function useDialog<T>()
{
      const [activeEntity, setActiveEntity] = useState<T | null>(null);
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
      const openEditDialog = (entity: T) => {
        setActiveEntity(entity);
        setIsEditDialogOpen(true);
      };
    
      const openDeleteDialog = (entity: T) => {
        setActiveEntity(entity);
        setIsDeleteDialogOpen(true);
      };


      return {activeEntity, isEditDialogOpen, isDeleteDialogOpen,setIsEditDialogOpen, setIsDeleteDialogOpen, openEditDialog, openDeleteDialog}
}