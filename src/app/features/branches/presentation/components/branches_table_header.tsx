import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function BranchesTableHeader() {
  return (
    <TableHeader className="bg-muted">
      <TableRow>
        <TableHead className="text-left w-12.5"></TableHead>
        <TableHead className="w-30">رقم الفرع</TableHead>
        <TableHead>اسم الفرع</TableHead>
        <TableHead>المدينة</TableHead>
      </TableRow>
    </TableHeader>
  );
}
