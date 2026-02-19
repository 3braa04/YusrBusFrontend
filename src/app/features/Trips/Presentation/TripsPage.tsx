import DeleteDialog from "@/app/core/components/Dialogs/DeleteDialog";
import EmptyTablePreview from "@/app/core/components/Table/EmptyTablePreview";
import TableRowActionsMenu from "@/app/core/components/Table/TableRowActionsMenu";
import useDialog from "@/app/core/Hooks/useDialog";
import useEntities from "@/app/core/Hooks/useEntities";
import TripsApiService from "@/app/core/Networking/Services/TripsApiService";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Table, TableBody } from "@/components/ui/table";
import { Building } from "lucide-react";
import SearchInput from "../../../core/components/Input/SearchInput";
import BranchRow from "../../../core/components/Table/TableBodyRow";
import TableCard from "../../../core/components/Table/TableCard";
import TableHeader from "../../../core/components/Table/TableHeader";
import TableHeaderRows from "../../../core/components/Table/TableHeaderRows";
import TablePagination from "../../../core/components/Table/TablePagination";
import type { Trip } from "../Data/Trip";
import ChangeTripDialog from "./ChangeTripDialog";

export default function TripsPage() {
  const { entities, refreash, isLoading } = useEntities<Trip>(
    new TripsApiService(),
  );
  const {
    selectedRow,
    isEditDialogOpen,
    isDeleteDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    openEditDialog,
    openDeleteDialog,
  } = useDialog<Trip>();

  return (
    <div className="px-5 py-3">
      <TableHeader
        title="إدارة الرحلات"
        buttonTitle="إضافة رحلة جديدة"
        createComp={
          <ChangeTripDialog
            entity={undefined}
            mode="create"
            onSuccess={(newData) => refreash(newData)}
          />
        }
      />

      <TableCard
        cards={[
          {
            title: "إجمالي الرحلات",
            data: (entities?.count ?? 0).toString(),
            icon: <Building className="h-4 w-4 text-muted-foreground" />,
          },
        ]}
      />

      <SearchInput />

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
                { rowName: "رقم الخط", rowStyles: "w-30" },
                { rowName: "اسم الخط", rowStyles: "" },
                { rowName: "من المدينة", rowStyles: "" },
                { rowName: "إلى المدينة", rowStyles: "" },
              ]}
            />

            <TableBody>
              {entities?.data?.map((trip, i) => (
                <BranchRow
                  key={i}
                  tableRows={[
                    { rowName: `#${trip.id}`, rowStyles: "" },
                    {
                      rowName: trip.mainCaptainName,
                      rowStyles: "font-semibold",
                    },
                    {
                      rowName: trip.secondaryCaptainName ?? "",
                      rowStyles:
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800",
                    },
                    {
                      rowName: trip.busName ?? "",
                      rowStyles:
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800",
                    },
                  ]}
                  dropdownMenu={
                    <TableRowActionsMenu
                      type="dropdown"
                      onEditClicked={() => openEditDialog(trip)}
                      onDeleteClicked={() => openDeleteDialog(trip)}
                    />
                  }
                  contextMenuContent={
                    <TableRowActionsMenu
                      type="context"
                      onEditClicked={() => openEditDialog(trip)}
                      onDeleteClicked={() => openDeleteDialog(trip)}
                    />
                  }
                />
              ))}
            </TableBody>
          </Table>
        )}
        <TablePagination pageSize={10} totalNumber={entities?.count ?? 0} />

        {isEditDialogOpen && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <ChangeTripDialog
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
                entityName="الرحلة"
                id={selectedRow?.id ?? 0}
                service={new TripsApiService()}
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
