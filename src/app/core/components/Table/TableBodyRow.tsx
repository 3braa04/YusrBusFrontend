import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ReactNode } from "react";

type TableBodyRow = {
  rowName: string,
  rowStyles: string
}

interface GenericRowProps {
  key: number;
  tableRows: TableBodyRow[];
  dropdownMenu: ReactNode;     
  contextMenuContent: ReactNode;
}

export default function TableBodyRow({ 
  key,
  tableRows, 
  dropdownMenu, 
  contextMenuContent 
}: GenericRowProps) {

  return (
    <>
      <ContextMenu key={key} dir="rtl">

        <ContextMenuTrigger asChild>

          <TableRow key={key} className="hover:bg-secondary/50 transition-colors">
            
            <TableCell>
              {dropdownMenu}
            </TableCell>

            {tableRows.map((row) => (
              <TableCell>
                <span className={row.rowStyles}>
                  {row.rowName}
                </span>
              </TableCell>
            ))}

          </TableRow>

        </ContextMenuTrigger>

        {contextMenuContent}

      </ContextMenu>
    </>
  );
}
