import { cn } from "@/lib/utils"; // Assuming you have the standard shadcn utils
import type { SeatType } from "./BusTypes";

interface SeatProps {
  seat: SeatType;
  onClick: (seat: SeatType) => void;
}

export default function BusSeat({ seat, onClick }: SeatProps) {
  const status = seat.status || 'available';

  return (
    <button
      onClick={() => status !== 'booked' && onClick(seat)}
      disabled={status === 'booked'}
      className={cn(
        "group relative flex h-12 w-12 flex-col items-center justify-center transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        // distinct styling based on status
        status === 'available' && "hover:-translate-y-1",
        status === 'booked' && "cursor-not-allowed opacity-50"
      )}
      aria-label={`Seat ${seat.id} - ${status}`}
    >
      {/* Seat Back (Top part) */}
      <div
        className={cn(
          "h-8 w-10 rounded-t-lg border-x-2 border-t-2 shadow-sm transition-colors",
          status === 'available' && "bg-white border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50",
          status === 'selected' && "bg-blue-600 border-blue-700 text-white",
          status === 'booked' && "bg-gray-200 border-gray-300"
        )}
      />

      {/* Seat Cushion (Bottom part) */}
      <div
        className={cn(
          "relative -mt-1 h-4 w-10 rounded-b-md border-2 shadow-sm",
          status === 'available' && "bg-white border-gray-300 group-hover:border-blue-400",
          status === 'selected' && "bg-blue-500 border-blue-700",
          status === 'booked' && "bg-gray-300 border-gray-400"
        )}
      >
        {/* Seat Number */}
        <span
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold",
            status === 'selected' ? "text-white" : "text-gray-600"
          )}
        >
          {seat.id}
        </span>
      </div>
      
      {/* Armrests (Visual flair) */}
      <div className="absolute bottom-2 -left-1 h-4 w-1 rounded-full bg-gray-300" />
      <div className="absolute bottom-2 -right-1 h-4 w-1 rounded-full bg-gray-300" />
    </button>
  );
}