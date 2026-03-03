import { SystemPermissionsResources } from "@/app/core/auth/systemPermissionsResources";
import DeleteDialog from "@/app/core/components/dialogs/deleteDialog";
import SearchInput from "@/app/core/components/input/searchInput";
import EmptyTablePreview from "@/app/core/components/table/emptyTablePreview";
import TableBodyRow from "@/app/core/components/table/tableBodyRow";
import TableCard from "@/app/core/components/table/tableCard";
import TableHeader from "@/app/core/components/table/tableHeader";
import TableHeaderRows from "@/app/core/components/table/tableHeaderRows";
import TablePagination from "@/app/core/components/table/tablePagination";
import TableRowActionsMenu from "@/app/core/components/table/tableRowActionsMenu";
import useDialog from "@/app/core/hooks/useDialog";
import useEntities from "@/app/core/hooks/useEntities";
import RolesApiService from "@/app/core/networking/services/rolesApiService";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Table, TableBody } from "@/components/ui/table";
import { Settings2 } from "lucide-react";
import { RouteFilterColumns } from "../../routes/data/route";
import type { Role } from "../data/role";
import ChangeRoleDialog from "./changeRoleDialog";

export default function RolesPage() {
  const { entities, refreash, filter, isLoading, currentPage, setCurrentPage } =
    useEntities<Role>(new RolesApiService());
  const {
    selectedRow,
    isEditDialogOpen,
    isDeleteDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    openEditDialog,
    openDeleteDialog,
  } = useDialog<Role>();

  return (
    <div className="px-5 py-3">
      <TableHeader
        title="إدارة الادوار"
        buttonTitle="إضافة دور جديد"
        createComp={
          <ChangeRoleDialog
            entity={undefined}
            mode="create"
            onSuccess={(newData) => refreash(newData)}
          />
        }
      />

      <TableCard
        cards={[
          {
            title: "إجمالي الادوار",
            data: (entities?.count ?? 0).toString(),
            icon: <Settings2 className="h-4 w-4 text-muted-foreground" />,
          },
        ]}
      />

      <SearchInput
        columnsNames={RouteFilterColumns.columnsNames}
        onSearch={(condition) => filter(condition)}
      />

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
                { rowName: "رقم الصلاحية", rowStyles: "w-30" },
                { rowName: "اسم الصلاحية", rowStyles: "" },
              ]}
            />

            <TableBody>
              {entities?.data?.map((role, i) => (
                <TableBodyRow
                  key={i}
                  tableRows={[
                    { rowName: `#${role.id}`, rowStyles: "" },
                    { rowName: role.name, rowStyles: "font-semibold" },
                  ]}
                  dropdownMenu={
                    <TableRowActionsMenu
                      type="dropdown"
                      permissionsResource={SystemPermissionsResources.Roles}
                      onEditClicked={() => openEditDialog(role)}
                      onDeleteClicked={() => openDeleteDialog(role)}
                    />
                  }
                  contextMenuContent={
                    <TableRowActionsMenu
                      type="context"
                      permissionsResource={SystemPermissionsResources.Roles}
                      onEditClicked={() => openEditDialog(role)}
                      onDeleteClicked={() => openDeleteDialog(role)}
                    />
                  }
                />
              ))}
            </TableBody>
          </Table>
        )}
        <TablePagination
          pageSize={100}
          totalNumber={entities?.count ?? 0}
          currentPage={currentPage || 1}
          onPageChanged={setCurrentPage}
        />

        {isEditDialogOpen && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <ChangeRoleDialog
              entity={selectedRow || undefined}
              mode={selectedRow ? "update" : "create"}
              onSuccess={(data, mode) => {
                refreash(data);
                if(mode === 'create')
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
                entityName="الدور"
                id={selectedRow?.id ?? 0}
                service={new RolesApiService()}
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
