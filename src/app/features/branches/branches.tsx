import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Building, MapPin, MoreHorizontal, PlusIcon, Search } from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const branches = [
    { id: 1, name: 'فرع المدينة المنورة', cityId: 104, cityName: 'المدينة' },
    { id: 2, name: 'فرع مكة المكرمة', cityId: 103, cityName: 'مكة' },
    { id: 3, name: 'فرع جدة', cityId: 102, cityName: 'جدة'},
    { id: 4, name: 'فرع الرياض', cityId: 101, cityName: 'الرياض' },
];

const Branches = () => {
  return (

    <div className="px-5 py-3">

      <div className="flex justify-between mb-8 gap-3">
        <div>
          <h1>إدارة الفروع</h1>
        </div>
        <Button variant="default">
          <PlusIcon className="h-4 w-4" /> 
          إضافة فرع جديد
        </Button>
      </div>

      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              إجمالي الفروع
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branches.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              المدن المغطاة
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 rounded-t-xl border-x border-t flex flex-col justify-between sm:flex-row gap-4 ">
        <div className="relative w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="ابحث عن فرع أو مدينة..." 
            className="pr-10 bg-secondary border-none focus-visible:ring-1"
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm">تصفية</Button>
        </div>
      </div>

      <div className="rounded-b-xl border shadow-sm overflow-hidden">

        <Table>

          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="text-left w-12.5"></TableHead>
              <TableHead className="w-30">رقم الفرع</TableHead>
              <TableHead>اسم الفرع</TableHead>
              <TableHead>المدينة</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

            {branches.map((branch) => (

                <ContextMenu key={branch.id} dir="rtl">

                    <ContextMenuTrigger asChild>
                    
                        <TableRow key={branch.id} className="hover:bg-secondary/50 transition-colors">

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
                                    <DropdownMenuItem className="text-destructive">حذف</DropdownMenuItem>
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

                    <ContextMenuContent>
                        <ContextMenuGroup>
                            <ContextMenuLabel>الإجراءات</ContextMenuLabel>
                            <ContextMenuSeparator></ContextMenuSeparator>
                            <ContextMenuItem>تعديل</ContextMenuItem>
                            <ContextMenuItem className="text-destructive">حذف</ContextMenuItem>
                        </ContextMenuGroup>
                    </ContextMenuContent>

                </ContextMenu>

            ))}

          </TableBody>

        </Table>
        
        <div className="p-4 border-t bg-muted flex items-center justify-between text-sm text-muted-foreground">
            <span className="w-50">
                عرض {branches.length} من 34 فرع
            </span>
            <Pagination dir='rtl' className="justify-end w-auto mx-0">
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious href="#" text="السابق" />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
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

      </div>
    </div>
    
  );
};

export default Branches;