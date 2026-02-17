import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { Building, MapPin } from "lucide-react";
import SearchInput from "../../../core/components/Input/SearchInput";
import BranchRow from "../../../core/components/Table/TableBodyRow";
import TableCard from "../../../core/components/Table/TableCard";
import TableHeader from "../../../core/components/Table/TableHeader";
import TableHeaderRows from "../../../core/components/Table/TableHeaderRows";
import TablePagination from "../../../core/components/Table/TablePagination";
import Branch from "../data/Branch";
import ChangeBranchDialog from "./components/ChangeBranchDialog";
import { useEffect, useState } from "react";
import BranchesApiService from "@/app/core/Networking/Services/BranchesApiService";
import type { FilterResult } from "@/app/core/Data/FilterResult";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TableRowActionsMenu from "@/app/core/components/Table/TableRowActionsMenu";
import DeleteDialog from "@/app/core/components/Dialogs/DeleteDialog";


export default function BranchesPage()
{
  const [branches, setBranches] = useState<FilterResult<Branch>>();
  const [activeBranch, setActiveBranch] = useState<Branch | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openEditDialog = (branch: Branch) => {
    setActiveBranch(branch);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (branch: Branch) => {
    setActiveBranch(branch);
    setIsDeleteDialogOpen(true);
  };

  const handleDataChange = (newData: Branch) => {
    setBranches((prev) => {
      if (!prev) return prev;

      const exists = prev.data?.find(b => b.id === newData.id);
      
      if (exists) {
        return {
          ...prev,
          data: prev.data?.map(b => b.id === newData.id ? newData : b) ?? null
        };
      } 
      
      return {
        ...prev,
        count: prev.count + 1,
        data: [newData, ...(prev.data ?? [])]
      };
    });
  };

  const Delete = async () =>
  {
    var service = new BranchesApiService();
    var res = await service.Delete(activeBranch?.id ?? 0);
    
    if (res.status === 200){
      setBranches((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          count: prev.count - 1,
          data: prev.data?.filter((b) => b.id !== activeBranch?.id) ?? null,
        };
      });
      setIsDeleteDialogOpen(false);
    }
  }
  
  useEffect(() => {
    const dataFetch = async () => {
      const service = new BranchesApiService();
      const result = await service.Filter(1, 100);

      if(result.data)
        setBranches(result.data);
    }
    dataFetch();
  }, []);

  return (

    <div className="px-5 py-3">

      <TableHeader title="إدارة الفروع" buttonTitle="إضافة فرع جديد" 
        createComp={
          <ChangeBranchDialog 
            branch={undefined} 
            type="create" 
            onSuccess={handleDataChange}
          />
        } 
      />

      <TableCard cards={[
        {title: "إجمالي الفروع", data: (branches?.count ?? 0).toString(), icon:<Building className="h-4 w-4 text-muted-foreground" />},
        {title: "المدن المغطاة", data: (4).toString(), icon:<MapPin className="h-4 w-4 text-muted-foreground" />},
      ]}/>

      <SearchInput/>

      <div className="rounded-b-xl border shadow-sm overflow-hidden">

        <Table>

          <TableHeaderRows tableHeadRows={[
            {rowName: "", rowStyles: "text-left w-12.5"},
            {rowName: "رقم الفرع", rowStyles: "w-30"},
            {rowName: "اسم الفرع", rowStyles: ""},
            {rowName: "المدينة", rowStyles: ""},
          ]}/>

          <TableBody>

            {branches?.data?.map((branch,i) => (
                <BranchRow key={i} tableRows={[
                  {rowName: `#${branch.id}`, rowStyles: ""},
                  {rowName: branch.name, rowStyles: "font-semibold"},
                  {rowName: branch.cityName, rowStyles: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"},
                ]}
                dropdownMenu={<TableRowActionsMenu type="dropdown"
                    onEditClicked={() => openEditDialog(branch)}
                    onDeleteClicked={() => openDeleteDialog(branch)}
                  />
                }
                contextMenuContent={<TableRowActionsMenu type="context" 
                    onEditClicked={() => openEditDialog(branch)}
                    onDeleteClicked={() => openDeleteDialog(branch)}
                  />
                }
                />
            ))}

          </TableBody>

        </Table>
        
        <TablePagination pageSize={100} totalNumber={branches?.count ?? 0} />

        {isEditDialogOpen && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <ChangeBranchDialog 
              branch={activeBranch || undefined} 
              type={activeBranch ? "update" : "create"} 
              onSuccess={(data) => {
                handleDataChange(data);
                setIsEditDialogOpen(false);
              }} 
            />
          </Dialog>
        )}

        {isDeleteDialogOpen && (
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent dir="rtl" className="sm:max-w-sm">
                  <DeleteDialog 
                    entityName="الخط" 
                    id={activeBranch?.id ?? 0}
                    onDelete={Delete}
                  />
              </DialogContent>
          </Dialog>
        )}

      </div>
    </div>
    
  );
};