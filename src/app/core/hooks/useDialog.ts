import { useState } from "react";

export default function useDialog<T>(
  allowToProcess: (data: T) => boolean = () => true,
) {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openEditDialog = (entity: T) => {
    if (!allowToProcess(entity)) return;
    setSelectedRow(entity);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (entity: T) => {
    if (!allowToProcess(entity)) return;
    setSelectedRow(entity);
    setIsDeleteDialogOpen(true);
  };

  return {
    selectedRow,
    isEditDialogOpen,
    isDeleteDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    openEditDialog,
    openDeleteDialog,
  };
}
