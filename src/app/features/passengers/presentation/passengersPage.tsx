import DeleteDialog from "@/app/core/components/dialogs/deleteDialog";
import TableRowActionsMenu from "@/app/core/components/table/tableRowActionsMenu";
import useDialog from "@/app/core/hooks/useDialog";
import useEntities from "@/app/core/hooks/useEntities";
import PassengersApiService from "@/app/core/networking/services/passengersApiService";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Table, TableBody } from "@/components/ui/table";
import { Building } from "lucide-react";
import SearchInput from "../../../core/components/input/searchInput";
import BranchRow from "../../../core/components/table/tableBodyRow";
import TableCard from "../../../core/components/table/tableCard";
import TableHeader from "../../../core/components/table/tableHeader";
import TableHeaderRows from "../../../core/components/table/tableHeaderRows";
import TablePagination from "../../../core/components/table/tablePagination";
import { Passenger, PassengerFilterColumns } from "../data/passenger";
import ChangePassengerDialog from "./changePassengerDialog";
import EmptyTablePreview from "@/app/core/components/table/emptyTablePreview";

export default function PassengersPage() {
  const { entities, refreash, filter, isLoading, currentPage, setCurrentPage } = useEntities<Passenger>(
    new PassengersApiService(),
  );
  const {
    selectedRow,
    isEditDialogOpen,
    isDeleteDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    openEditDialog,
    openDeleteDialog,
  } = useDialog<Passenger>();

  return (
    <div className="px-5 py-3">
      <TableHeader
        title="إدارة الركاب"
        buttonTitle="إضافة راكب جديد"
        createComp={
          <ChangePassengerDialog
            entity={undefined}
            mode="create"
            onSuccess={(newData) => refreash(newData)}
          />
        }
      />

      <TableCard
        cards={[
          {
            title: "إجمالي الركاب",
            data: (entities?.count ?? 0).toString(),
            icon: <Building className="h-4 w-4 text-muted-foreground" />,
          },
        ]}
      />

      <SearchInput columnsNames={PassengerFilterColumns.columnsNames} onClicked={(condition) => filter(condition)}/>

      <div className="rounded-b-xl border shadow-sm overflow-hidden">
        {isLoading ? (
          <EmptyTablePreview mode="loading" />
        ) : entities?.count == 0 ? (
          <EmptyTablePreview mode="empty" />
        ) : entities == undefined ? (
          <EmptyTablePreview mode="error" />
        ) : (
          <Table>
            <TableHeaderRows
              tableHeadRows={[
                { rowName: "", rowStyles: "text-left w-12.5" },
                { rowName: "رقم الراكب", rowStyles: "w-30" },
                { rowName: "اسم الراكب", rowStyles: "" },
                { rowName: "الجنس", rowStyles: "" },
                { rowName: "رقم الجوال", rowStyles: "" },
                { rowName: "البريد الإلكتروني", rowStyles: "" },
                { rowName: "الجنسية", rowStyles: "" },
              ]}
            />

            <TableBody>
              {entities?.data?.map((passenger, i) => (
                <BranchRow
                  key={i}
                  tableRows={[
                    { rowName: `#${passenger.id}`, rowStyles: "" },
                    { rowName: passenger.name, rowStyles: "font-semibold" },
                    {
                      rowName: passenger.gender === 0 ? "ذكر" : "أنثى",
                      rowStyles: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${passenger.gender === 0 ? "bg-blue-300" : "bg-pink-300"} text-slate-800`,
                    },
                    { rowName: passenger.phoneNumber ?? "-", rowStyles: "" },
                    { rowName: passenger.email ?? "-", rowStyles: "" },
                    {
                      rowName: passenger.nationality?.name ?? "-",
                      rowStyles:
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-300 text-slate-800",
                    },
                  ]}
                  dropdownMenu={
                    <TableRowActionsMenu
                      type="dropdown"
                      onEditClicked={() => openEditDialog(passenger)}
                      onDeleteClicked={() => openDeleteDialog(passenger)}
                    />
                  }
                  contextMenuContent={
                    <TableRowActionsMenu
                      type="context"
                      onEditClicked={() => openEditDialog(passenger)}
                      onDeleteClicked={() => openDeleteDialog(passenger)}
                    />
                  }
                />
              ))}
            </TableBody>
          </Table>
        )}
        <TablePagination pageSize={3} totalNumber={entities?.count ?? 0} currentPage={currentPage || 1} onPageChanged={setCurrentPage} />

        {isEditDialogOpen && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <ChangePassengerDialog
              entity={selectedRow || undefined}
              mode={selectedRow ? "update" : "create"}
              onSuccess={(data) => {
                refreash(data);
                setIsEditDialogOpen(false);
              }}
            />
          </Dialog>
        )}

        {isDeleteDialogOpen && (
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent dir="rtl" className="sm:max-w-sm">
              <DeleteDialog
                entityName="الراكب"
                id={selectedRow?.id ?? 0}
                service={new PassengersApiService()}
                onSuccess={() => {
                  refreash(undefined, selectedRow?.id);
                  setIsDeleteDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
