import { cn } from "@/lib/utils";
import type { Ticket } from "../Data/Ticket";
import type { SeatType } from "./BusTypes";

interface SeatProps {
  seat: SeatType;
  ticket?: Ticket;
  onClick: (seat: SeatType) => void;
}

export default function BusSeat({ seat, ticket, onClick }: SeatProps) {
  const isOccupied = !!ticket;
  const isSelected = seat.status === 'selected';

  return (
    <button
      dir="rtl"
      type="button"
      onClick={() => onClick(seat)}
      className="group relative flex h-22 w-18 flex-col items-center transition-all hover:scale-105 active:scale-95"
    >
      {/* مسند الرأس */}
      <div className={cn(
        "z-10 h-1.5 w-8 rounded-t-md",
        isOccupied ? "bg-red-700" : isSelected ? "bg-blue-700" : "bg-emerald-700"
      )} />

      {/* جسم الكرسي */}
      <div className={cn(
        "flex w-full flex-1 flex-col overflow-hidden rounded-lg border shadow-sm",
        isOccupied ? "border-red-500 bg-red-300/30" :
        isSelected ? "border-blue-500 bg-blue-300" :
        "border-emerald-500 bg-background/30"
      )}>

        {/* العنوان */}
        <div className={cn(
          "flex justify-between px-1 py-px text-[9px] font-bold text-white",
          isOccupied ? "bg-red-600" : isSelected ? "bg-blue-600" : "bg-emerald-600"
        )}>
          <span>{seat.id < 0? 'طفل' : 'مقعد'} {Math.abs(seat.id)}</span>
          <span>${ticket?.amount ?? "0"}</span>
        </div>

        {/* المحتوى */}
        {isOccupied ? (
          <div className="flex flex-col gap-px px-1 py-0.5 text-[8px] text-right leading-tight">

            <p className="truncate font-bold">
              {ticket.passenger?.name}
            </p>

            <p className="truncate opacity-80">
              {ticket.passenger?.nationality?.name}
            </p>

            {/* المسار */}
            <div className="mt-px border-t border-red-200 pt-px text-[8px] font-semibold">
              <span className="block truncate">{ticket.fromCityName}</span>
              <span className="block text-center text-[7px]">إلى</span>
              <span className="block truncate">{ticket.toCityName}</span>
            </div>

          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-0">
            <span className="text-[8px] font-bold text-emerald-500">متاح</span>
          </div>
        )}
      </div>

      {/* مساند اليد */}
      <div className={cn(
        "absolute top-6 -left-0.5 h-5 w-1 rounded-full",
        isOccupied ? "bg-red-300" : "bg-slate-300"
      )} />
      <div className={cn(
        "absolute top-6 -right-0.5 h-5 w-1 rounded-full",
        isOccupied ? "bg-red-300" : "bg-slate-300"
      )} />
    </button>
  );
}