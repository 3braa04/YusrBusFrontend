import TableCard from "@/app/core/components/Table/TableCard";
import TableHeader from "@/app/core/components/Table/TableHeader";
import TablePagination from "@/app/core/components/Table/TablePagination";

//TODO: Sample must be changed
import ChangeBranchDialog from "../branches/presentation/components/ChangeBranchDialog";
import UserDTO, { sampleUsersList } from "./Data/UserDTO";
import SearchInput from "@/app/core/components/Input/SearchInput";
import { User2Icon } from "lucide-react";
import { Table, TableBody } from "@/components/ui/table";
import TableHeaderRows from "@/app/core/components/Table/TableHeaderRows";
import TableBodyRow from "@/app/core/components/Table/TableBodyRow";

export default function UsersScreen() {
  return (
    <div className="px-5 py-3">
      <TableHeader
        title="إدارة المستخدمين"
        buttonTitle="إضافة مستخدم جديد"
        createComp={<ChangeBranchDialog branch={undefined} type="create" />}
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
                {rowName:"", rowStyles:""},
              { rowName: "رقم المستخدم", rowStyles: " w-12.5" },
              { rowName: "اسم المستخدم", rowStyles: "w-30" },
              { rowName: "هل المستخدم نشط", rowStyles: "" },
              { rowName: "الصلاحيات", rowStyles: "" },
            ]}
          />

          <TableBody>
            {sampleUsersList.map((user, index) => (
              <UserRow user={ user} key={index}/>
            ))}
          </TableBody>
        </Table>

        <TablePagination pageSize={10} totalNumber={100} />
      </div>
    </div>
  );
}


type UserRowProps = {
    user:UserDTO;
}
function UserRow({user}: UserRowProps) {
  return (
    <TableBodyRow
      tableRows={[
        { rowName: `#${user.userId}`, rowStyles: "" },
        { rowName: user.username, rowStyles: "font-semibold" },
        { rowName: user.isActive?'نشط':'غير نشط', rowStyles: "" },
        { rowName: "" + user.permissions, rowStyles: "" },
      ]}
      dropdownMenu={<></>}
      contextMenuContent={<></>}
    />
  );
}
