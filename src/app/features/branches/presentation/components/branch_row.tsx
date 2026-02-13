import type BranchDTO from "../../data/branch_dto";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BranchesContextContent from "./branches_context_content";
import { TableCell, TableRow } from "@/components/ui/table";

type BrancRowProps = {
  branch: BranchDTO;
};
export default function BranchRow({ branch }: BrancRowProps) {
  return (
    <ContextMenu key={branch.id} dir="rtl">
      <ContextMenuTrigger asChild>
        <TableRow
          key={branch.id}
          className="hover:bg-secondary/50 transition-colors"
        >
          <TableCell>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem>تعديل</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  حذف
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>

          <TableCell>#{branch.id}</TableCell>

          <TableCell>
            <h3 className="font-semibold">{branch.name}</h3>
          </TableCell>

          <TableCell>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
              {branch.cityName}
            </span>
          </TableCell>
        </TableRow>
      </ContextMenuTrigger>

      <BranchesContextContent />
    </ContextMenu>
  );
}
