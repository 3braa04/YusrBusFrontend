import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

import useDashbaord from "@/app/core/hooks/useDashboard";
import TripsPage from "../trips/presentation/tripsPage";

export default function DashboardPage() {
    const {data} = useDashbaord();
  
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {data && <SectionCards data={data}/>}
        <ChartAreaInteractive tripsInTime={(data?.tripsInTime || []).map(trip => ({
          ...trip,
          date: trip.date instanceof Date ? trip.date : new Date(trip.date)
        }))}/>
      <TripsPage/>
    </div>
  )
}
