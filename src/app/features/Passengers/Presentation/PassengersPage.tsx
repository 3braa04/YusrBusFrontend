import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { Building } from "lucide-react";
import SearchInput from "../../../core/components/Input/SearchInput";
import BranchRow from "../../../core/components/Table/TableBodyRow";
import TableCard from "../../../core/components/Table/TableCard";
import TableHeader from "../../../core/components/Table/TableHeader";
import TableHeaderRows from "../../../core/components/Table/TableHeaderRows";
import TablePagination from "../../../core/components/Table/TablePagination";
import { SamplePassengersList } from "../Data/Passenger";
import ChangePassengerDialog from "./Components/ChangePassengerDialog";
import PassengersActionsMenu from "./Components/PassengersActionsMenu";

export default function PassengersPage()
{
  return (

    <div className="px-5 py-3">

      <TableHeader title="إدارة الركاب" buttonTitle="إضافة راكب جديد" createComp={<ChangePassengerDialog passenger={undefined} type="create" />} />

      <TableCard cards={[
        {title: "إجمالي الركاب", data: SamplePassengersList.length.toString(), icon:<Building className="h-4 w-4 text-muted-foreground" />},
      ]}/>

      <SearchInput/>

      <div className="rounded-b-xl border shadow-sm overflow-hidden">

        <Table>

          <TableHeaderRows tableHeadRows={[
            {rowName: "", rowStyles: "text-left w-12.5"},
            {rowName: "رقم الراكب", rowStyles: "w-30"},
            {rowName: "اسم الراكب", rowStyles: ""},
            {rowName: "الجنس", rowStyles: ""},
            {rowName: "رقم الجوال", rowStyles: ""},
            {rowName: "البريد الإلكتروني", rowStyles: ""},
            {rowName: "الجنسية", rowStyles: ""},
          ]}/>

          <TableBody>

            {SamplePassengersList.map((passenger,i) => (
                <BranchRow key={i} tableRows={[
                  {rowName: `#${passenger.id}`, rowStyles: ""},
                  {rowName: passenger.name, rowStyles: "font-semibold"},
                  {rowName: passenger.gender === 0? 'ذكر' : 'أنثى', 
                    rowStyles: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${passenger.gender === 0? 'bg-blue-300' : 'bg-pink-300'} text-slate-800`},
                  {rowName: passenger.phoneNumber ?? '-', rowStyles: ""},
                  {rowName: passenger.email ?? '-', rowStyles: ""},
                  {rowName: passenger.nationality?.Name ?? '-', rowStyles: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-300 text-slate-800"},
                ]}
                dropdownMenu={<PassengersActionsMenu type="dropdown" passenger={passenger} />}
                contextMenuContent={<PassengersActionsMenu type="context" passenger={passenger} />}
                />
            ))}

          </TableBody>

        </Table>
        
        <TablePagination pageSize={10} totalNumber={100} />

      </div>
    </div>
    
  );
};