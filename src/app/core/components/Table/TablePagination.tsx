import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useState } from "react";

type PaginationFooterProps = {
  pageSize: number,
  totalNumber: number;
};

export default function TablePagination({
  pageSize,
  totalNumber,
}: PaginationFooterProps) {

  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="p-4 border-t bg-muted flex items-center justify-between text-sm text-muted-foreground">
      <span className="w-50"> نتائج {(currentPage - 1) * pageSize}  - {currentPage * pageSize} من {totalNumber} </span>
      
      <Pagination dir="rtl" className="justify-end w-auto mx-0">
        
        <PaginationContent>
          
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage(DecrementPage(currentPage))} text="السابق" />
          </PaginationItem>

          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full h-5 justify-start gap-2 text-base">
                  <span>{currentPage}</span>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Array.from({ length: Math.ceil(totalNumber / pageSize) }, (_, i) => (
                <DropdownMenuItem key={i + 1} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage(IncrementPage(currentPage, pageSize, totalNumber))} text="التالي"/>
          </PaginationItem>

        </PaginationContent>

      </Pagination>
    </div>
  );
}

function DecrementPage(currPage: number)
{
  return currPage < 2? 1 : --currPage;
}

function IncrementPage(currPage: number, pageSize: number, totalNumber: number)
{
  let pagesNumber = Math.floor(totalNumber / pageSize)
  return currPage > (pagesNumber - 1)? pagesNumber : ++currPage;
}
