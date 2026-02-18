import type { BusProps, SeatType } from "./BusTypes";
import BusSeat from "./BusSeat";
import { ShipWheel } from "lucide-react"; // Make sure to install lucide-react

export default function BusLayout({
  seats,
  onSeatClick,
  lastRowFull = false,
}: BusProps) {
  // Group seats into "columns" (physical rows of the bus)
  const columns: SeatType[][] = [];
  for (let i = 0; i < seats.length; i += 4) {
    columns.push(seats.slice(i, i + 4));
  }

  return (

    <div className="w-full overflow-x-auto p-6">
      {/* Bus Chassis Container */}
      <div className="mx-auto flex w-max min-w-[600px] flex-row rounded-[3rem] border-4 border-slate-300 bg-slate-50 p-8 shadow-xl relative">
        
        {/* Front of Bus / Driver Area */}
        <div className="mr-8 flex flex-col justify-end border-r-2 border-dashed border-slate-300 pr-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 shadow-inner">
            <ShipWheel className="h-8 w-8" />
          </div>
          <span className="mt-2 text-xs font-semibold uppercase text-slate-400 text-center">Driver</span>
        </div>

        {/* Passenger Area */}
        <div className="flex flex-row gap-6">
          {columns.map((colSeats, colIndex) => {
            const isLastColumn = colIndex === columns.length - 1;
            
            // In horizontal mode:
            // "Left" seats become "Top" pair
            // "Right" seats become "Bottom" pair
            const topPair = colSeats.slice(0, 2); 
            const bottomPair = colSeats.slice(2, 4);

            // Handle the special "Back of the bus" case
            // If lastRowFull is true, we treat the last column as a continuous vertical block
            if (isLastColumn && lastRowFull) {
              return (
                <div key={colIndex} className="flex flex-col justify-center gap-2 border-l border-slate-200 pl-2">
                  {colSeats.map((seat) => (
                    <BusSeat key={seat.id} seat={seat} onClick={onSeatClick} />
                  ))}
                </div>
              );
            }

            return (
              <div key={colIndex} className="flex flex-col justify-between">
                {/* Top Pair (Window + Aisle) */}
                <div className="flex flex-col gap-2">
                  {/* We reverse the top pair so the window seat is at the top edge */}
                  {topPair.map((seat) => (
                    <BusSeat key={seat.id} seat={seat} onClick={onSeatClick} />
                  ))}
                </div>

                {/* Aisle Spacer */}
                <div className="h-12 flex items-center justify-center">
                   <span className="text-[10px] text-slate-300 font-mono">{colIndex + 1}</span>
                </div>

                {/* Bottom Pair (Aisle + Window) */}
                <div className="flex flex-col gap-2">
                  {bottomPair.map((seat) => (
                    <BusSeat key={seat.id} seat={seat} onClick={onSeatClick} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative: Rear Wheels (Absolute positioned) */}
        <div className="absolute -bottom-4 left-24 h-4 w-16 rounded-b-xl bg-slate-800" />
        <div className="absolute -bottom-4 right-24 h-4 w-16 rounded-b-xl bg-slate-800" />
        <div className="absolute -top-4 left-24 h-4 w-16 rounded-t-xl bg-slate-800" />
        <div className="absolute -top-4 right-24 h-4 w-16 rounded-t-xl bg-slate-800" />
      </div>
      
      {/* Legend */}
      <div className="mt-8 flex justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-white border border-gray-300"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-blue-600 border border-blue-700"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-200 border border-gray-300"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}