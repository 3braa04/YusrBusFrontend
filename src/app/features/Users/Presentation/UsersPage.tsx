import DeleteDialog from "@/app/core/components/Dialogs/DeleteDialog";
import SearchInput from "@/app/core/components/Input/SearchInput";
import TableBodyRow from "@/app/core/components/Table/TableBodyRow";
import TableCard from "@/app/core/components/Table/TableCard";
import TableHeader from "@/app/core/components/Table/TableHeader";
import TableHeaderRows from "@/app/core/components/Table/TableHeaderRows";
import TablePagination from "@/app/core/components/Table/TablePagination";
import TableRowActionsMenu from "@/app/core/components/Table/TableRowActionsMenu";
import useDialog from "@/app/core/Hooks/useDialog";
import useEntities from "@/app/core/Hooks/useEntities";
import UsersApiService from "@/app/core/Networking/Services/UsersApiService";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Table, TableBody } from "@/components/ui/table";
import { User2Icon } from "lucide-react";
import User from "../Data/User";
import ChangeUserDialog from "./ChangeUserDialog";
import EmptyTablePreview from "@/app/core/components/Table/EmptyTablePreview";

export default function UsersPage() {
  const { entities, refreash, isLoading, currentPage, setCurrentPage } = useEntities<User>(
    new UsersApiService(),
  );

  const {
    selectedRow,
    isEditDialogOpen,
    isDeleteDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    openEditDialog,
    openDeleteDialog,
  } = useDialog<User>();

  return (
    <div className="px-5 py-3">
      <TableHeader
        title="إدارة المستخدمين"
        buttonTitle="إضافة مستخدم جديد"
        createComp={
          <ChangeUserDialog
            entity={undefined}
            mode="create"
            onSuccess={(newData) => {console.log(23232);
            ;refreash(newData)}}
          />
        }
      />

      <TableCard
        cards={[
          {
            title: "إجمالي المستخدمين",
            data: (entities?.count ?? 0).toString(),
            icon: <User2Icon className="h-4 w-4 text-muted-foreground" />,
          },
        ]}
      />
      <SearchInput />

      <div className="rounded-b-xl border shadow-sm overflow-hidden">
        {isLoading ? (
          <EmptyTablePreview mode="loading" />
        ) : entities?.count == 0 ? (
          <EmptyTablePreview mode="empty" />
        ) : entities == undefined?(
          <EmptyTablePreview mode="error"/>
        ):
          <Table>
            <TableHeaderRows
              tableHeadRows={[
                { rowName: "", rowStyles: "text-left w-12.5" },
                { rowName: "رقم المستخدم", rowStyles: "w-30" },
                { rowName: "اسم المستخدم", rowStyles: "w-70" },
                { rowName: "هل المستخدم نشط", rowStyles: "" },
              ]}
            />
            <TableBody>
              {entities?.data?.map((user, i) => (
                <TableBodyRow
                  key={i}
                  tableRows={[
                    { rowName: `#${user.id}`, rowStyles: "" },
                    { rowName: user.username, rowStyles: "font-semibold" },
                    {
                      rowName: user.isActive ? "نشط" : "غير نشط",
                      rowStyles: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? "bg-green-300" : "bg-red-300"} text-slate-800`,
                    },
                  ]}
                  dropdownMenu={
                    <TableRowActionsMenu
                      type="dropdown"
                      onEditClicked={() => openEditDialog(user)}
                      onDeleteClicked={() => openDeleteDialog(user)}
                    />
                  }
                  contextMenuContent={
                    <TableRowActionsMenu
                      type="context"
                      onEditClicked={() => openEditDialog(user)}
                      onDeleteClicked={() => openDeleteDialog(user)}
                    />
                  }
                />
              ))}
            </TableBody>
          </Table>
        }
        <TablePagination pageSize={10} totalNumber={entities?.count ?? 0} currentPage={currentPage || 1} onPageChanged={setCurrentPage} />

        {isEditDialogOpen && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <ChangeUserDialog
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
                entityName="المستخدم"
                id={selectedRow?.id ?? 0}
                service={new UsersApiService()}
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
