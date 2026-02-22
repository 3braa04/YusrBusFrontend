import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

import useDashbaord from "@/app/core/Hooks/useDashboard";
import TripsPage from "../Trips/Presentation/TripsPage";

export default function DashboardPage() {
    const {data} = useDashbaord();
  
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {data && <SectionCards data={data}/>}
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive/>
      </div>
      <TripsPage/>
    </div>
  )
}
