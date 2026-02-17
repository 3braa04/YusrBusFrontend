import SearchInput from "@/app/core/components/Input/SearchInput";
import TableBodyRow from "@/app/core/components/Table/TableBodyRow";
import TableCard from "@/app/core/components/Table/TableCard";
import TableHeader from "@/app/core/components/Table/TableHeader";
import TableHeaderRows from "@/app/core/components/Table/TableHeaderRows";
import TablePagination from "@/app/core/components/Table/TablePagination";
import { Table, TableBody } from "@/components/ui/table";
import { User2Icon } from "lucide-react";
import ChangeUserDialog from "./Components/ChangeUserDialog";
import UsersActionsMenu from "./Components/UsersActionsMenu";
import { sampleUsersList } from "./Data/User";


export default function UsersPage() {
  return (
    <div className="px-5 py-3">
      <TableHeader
        title="إدارة المستخدمين"
        buttonTitle="إضافة مستخدم جديد"
        createComp={<ChangeUserDialog user={undefined} type="create" />}
      />

      <TableCard
        cards={[
          {
            title: "إجمالي المستخدمين",
            data: sampleUsersList.length.toString(),
            icon: <User2Icon className="h-4 w-4 text-muted-foreground" />,
          },
        ]}
      />

      <SearchInput />

      <div className="rounded-b-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeaderRows
            tableHeadRows={[
              {rowName:"", rowStyles: "text-left w-12.5"},
              { rowName: "رقم المستخدم", rowStyles: "w-30" },
              { rowName: "اسم المستخدم", rowStyles: "w-70" },
              { rowName: "هل المستخدم نشط", rowStyles: "" },
            ]}
          />

          <TableBody>
            {sampleUsersList.map((user, i) => (
              <TableBodyRow key={i} tableRows={[
                { rowName: `#${user.id}`, rowStyles: "" },
                { rowName: user.username, rowStyles: "font-semibold" },
                { rowName: user.isActive?'نشط':'غير نشط', rowStyles: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive? 'bg-green-300' : 'bg-red-300'} text-slate-800` },
              ]}
              dropdownMenu={<UsersActionsMenu type="dropdown" user={user} />}
              contextMenuContent={<UsersActionsMenu type="context" user={user} />}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination pageSize={10} totalNumber={100} />
      </div>
    </div>
  );
}
