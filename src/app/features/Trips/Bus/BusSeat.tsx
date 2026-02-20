import { cn } from "@/lib/utils";
import type { SeatProps } from "./BusTypes";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Trash2 } from "lucide-react";

export default function BusSeat({
  seat,
  ticket,
  onClick,
  highlighted,
  isDimmed,
  onDeleteTicket,
  onHoverData,
}: SeatProps) {
  const isOccupied = !!ticket;

  const handleContextMenuAction = (e: React.MouseEvent) => {
    // Only show menu if seat is occupied
    if (!isOccupied) e.preventDefault();
  };

  return (
      <ContextMenu dir="rtl">

        <ContextMenuTrigger asChild>

          <button
            dir="rtl"
            type="button"
            onClick={() => onClick(seat)}
            onContextMenu={handleContextMenuAction}
            className={cn(
              "group relative flex h-22 w-18 flex-col items-center transition-all duration-300 ease-in-out",
              isDimmed
                ? "opacity-30 grayscale-[0.5] scale-95"
                : "hover:scale-105 active:scale-95",
              highlighted &&
                "scale-110 z-50 ring-2 ring-yellow-400 ring-offset-2 rounded-lg",
            )}
          >
            {/* مسند الرأس */}
            <div
              className={cn(
                "z-10 h-1.5 w-8 rounded-t-md transition-colors duration-300",
                highlighted
                  ? "bg-yellow-500"
                  : isOccupied
                    ? "bg-red-700"
                    : "bg-emerald-700",
              )}
            />

            {/* جسم الكرسي */}
            <div
              className={cn(
                "flex w-full flex-1 flex-col overflow-hidden rounded-lg border shadow-sm transition-colors duration-300",
                highlighted
                  ? "border-yellow-500 bg-yellow-100/50"
                  : isOccupied
                    ? "border-red-500 bg-red-300/30"
                    : "border-emerald-500 bg-background/30",
              )}
            >
              {/* العنوان */}
              <div
                className={cn(
                  "flex justify-between px-1 py-px text-[9px] font-bold text-white transition-colors duration-300",
                  highlighted
                    ? "bg-yellow-600"
                    : isOccupied
                      ? "bg-red-600"
                      : "bg-emerald-600",
                )}
              >
                <span>
                  {seat.id < 0 ? "طفل" : "مقعد"} {Math.abs(seat.id)}
                </span>
                <span
                  onMouseEnter={() =>
                    onHoverData?.("amount", ticket?.amount.toString())
                  }
                  onMouseLeave={() => onHoverData?.(null)}
                >
                  ${ticket?.amount ?? "0"}
                </span>
              </div>

              {/* المحتوى */}
              {isOccupied ? (
                <div className="flex flex-col gap-px px-1 py-0.5 text-[8px] text-right leading-tight">
                  <p className="truncate font-bold">{ticket.passenger?.name}</p>

                  <p
                    className="truncate opacity-80 hover:bg-white/60 rounded px-0.5 transition-colors cursor-help"
                    onMouseEnter={() =>
                      onHoverData?.(
                        "nationality",
                        ticket.passenger?.nationality?.name,
                      )
                    }
                    onMouseLeave={() => onHoverData?.(null)}
                  >
                    {ticket.passenger?.nationality?.name}
                  </p>

                  <div className="mt-px border-t border-red-200 pt-px text-[8px] font-semibold">
                    <span
                      className="block truncate hover:bg-white/60 rounded px-0.5 transition-colors cursor-help"
                      onMouseEnter={() => onHoverData?.("from", ticket.fromCityName)}
                      onMouseLeave={() => onHoverData?.(null)}
                    >
                      {ticket.fromCityName}
                    </span>
                    <span className="block text-center text-[7px] opacity-40">
                      إلى
                    </span>
                    <span
                      className="block truncate hover:bg-white/60 rounded px-0.5 transition-colors cursor-help"
                      onMouseEnter={() => onHoverData?.("to", ticket.toCityName)}
                      onMouseLeave={() => onHoverData?.(null)}
                    >
                      {ticket.toCityName}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center">
                  <span className="text-[8px] font-bold text-emerald-500">متاح</span>
                </div>
              )}
            </div>

            {/* مساند اليد */}
            <div
              className={cn(
                "absolute top-6 -left-0.5 h-5 w-1 rounded-full",
                isOccupied ? "bg-red-300" : "bg-slate-300",
              )}
            />
            <div
              className={cn(
                "absolute top-6 -right-0.5 h-5 w-1 rounded-full",
                isOccupied ? "bg-red-300" : "bg-slate-300",
              )}
            />
          </button>

        </ContextMenuTrigger>

        {isOccupied && (
          <ContextMenuContent className="w-40">
            <ContextMenuItem
              className="flex justify-between items-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent seat click
                if (ticket?.id && onDeleteTicket) {
                  onDeleteTicket(ticket.id);
                }
              }}
            >
              <span>حذف التذكرة</span>
              <Trash2 className="h-4 w-4 text-red-600" />
            </ContextMenuItem>
          </ContextMenuContent>
        )}

      </ContextMenu>
    

  );
}
