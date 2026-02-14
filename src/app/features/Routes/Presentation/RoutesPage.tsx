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
import ChangeRouteDialog from "./Components/ChangeRouteDialog";
import { SampleRoutesList } from "../Data/Route";
import RoutesActionsMenu from "./Components/RoutesActionsMenu";

export default function RoutesPage()
{
  return (

    <div className="px-5 py-3">

      <TableHeader title="إدارة الخطوط" buttonTitle="إضافة خط جديد" createComp={<ChangeRouteDialog route={undefined} type="create" />} />

      <TableCard cards={[
        {title: "إجمالي الخطوط", data: SampleRoutesList.length.toString(), icon:<Building className="h-4 w-4 text-muted-foreground" />},
        {title: "المدن المغطاة", data: (4).toString(), icon:<MapPin className="h-4 w-4 text-muted-foreground" />},
      ]}/>

      <SearchInput/>

      <div className="rounded-b-xl border shadow-sm overflow-hidden">

        <Table>

          <TableHeaderRows tableHeadRows={[
            {rowName: "", rowStyles: "text-left w-12.5"},
            {rowName: "رقم الخط", rowStyles: "w-30"},
            {rowName: "اسم الخط", rowStyles: ""},
            {rowName: "من المدينة", rowStyles: ""},
            {rowName: "إلى المدينة", rowStyles: ""},
          ]}/>

          <TableBody>

            {SampleRoutesList.map((route,i) => (
                <BranchRow key={i} tableRows={[
                  {rowName: `#${route.id}`, rowStyles: ""},
                  {rowName: route.name, rowStyles: "font-semibold"},
                  {rowName: route.fromCityName, rowStyles: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"},
                  {rowName: route.toCityName, rowStyles: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"},
                ]}
                dropdownMenu={<RoutesActionsMenu type="dropdown" route={route} />}
                contextMenuContent={<RoutesActionsMenu type="context" route={route} />}
                />
            ))}

          </TableBody>

        </Table>
        
        <TablePagination pageSize={10} totalNumber={100} />

      </div>
    </div>
    
  );
};