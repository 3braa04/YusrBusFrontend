import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { Building, MapPin } from "lucide-react";
import SearchInput from "../../../core/components/Input/SearchInput";
import BranchRow from "../../../core/components/Table/TableBodyRow";
import TableHeader from "../../../core/components/Table/TableHeader";
import TableHeaderRows from "../../../core/components/Table/TableHeaderRows";
import TablePagination from "../../../core/components/Table/TablePagination";
import { SampleBranchsList } from "../data/branch_dto";
import BranchesContextContent from "./components/BranchesContextContent";
import BranchesDropdownMenu from "./components/BranchesDropdownMenu";
import TableCard from "../../../core/components/Table/TableCard";


export default function Branches()
{
  return (

    <div className="px-5 py-3">

      <TableHeader title="إدارة الفروع" buttonTitle="إضافة فرع جديد"/>

      <TableCard cards={[
        {title: "إجمالي الفروع", data: SampleBranchsList.length.toString(), icon:<Building className="h-4 w-4 text-muted-foreground" />},
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

            {SampleBranchsList.map((branch,index) => (
                <BranchRow key={index} tableRows={[
                  {rowName: `#${branch.id}`, rowStyles: ""},
                  {rowName: branch.name, rowStyles: "font-semibold"},
                  {rowName: branch.cityName, rowStyles: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"},
                ]}
                dropdownMenu={<BranchesDropdownMenu />}
                contextMenuContent={<BranchesContextContent />}
                />
            ))}

          </TableBody>

        </Table>
        
        <TablePagination pageSize={10} totalNumber={100} />

      </div>
    </div>
    
  );
};