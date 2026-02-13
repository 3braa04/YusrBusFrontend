

import {
    Table,
    TableBody,
} from "@/components/ui/table";


import BranchesHeader from "./components/branches_header";
import BranchesCards from "./components/branches_cards";
import SearchInput from "./components/search_input";
import { SampleBranchsList } from "../data/branch_dto";
import BranchRow from "./components/branch_row";
import BranchesTableHeader from "./components/branches_table_header";
import PaginationFooter from "./components/pagination_footer";


const Branches = () => {
  return (

    <div className="px-5 py-3">

      <BranchesHeader/>

      <BranchesCards totalBranches={SampleBranchsList.length} totalCities={4}/>

      <SearchInput/>

      <div className="rounded-b-xl border shadow-sm overflow-hidden">

        <Table>

        <BranchesTableHeader/>

          <TableBody>

            {SampleBranchsList.map((branch,index) => (

                <BranchRow branch={branch} key={index}/>
            ))}

          </TableBody>

        </Table>
        
        <PaginationFooter totalBranches={SampleBranchsList.length} />

      </div>
    </div>
    
  );
};

export default Branches;