import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationFooterProps = {
  totalBranches: number;
};

export default function PaginationFooter({
  totalBranches,
}: PaginationFooterProps) {
  return (
    <div className="p-4 border-t bg-muted flex items-center justify-between text-sm text-muted-foreground">
      <span className="w-50">عرض {totalBranches} من 34 فرع</span>
      <Pagination dir="rtl" className="justify-end w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" text="السابق" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" text="التالي" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
