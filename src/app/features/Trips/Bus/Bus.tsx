import { ShipWheel, Baby, Plus } from "lucide-react";
import { useMemo } from "react";
import BusSeat from "./BusSeat";
import type { BusProps } from "./BusTypes";

export default function BusLayout({
  seats,
  tickets,
  onSeatClick,
  lastRowFull = false,
}: BusProps) {
  // 1. Map for physical seats (1, 2, 3...)
  const ticketMap = useMemo(() => {
    const map: Record<number, any> = {};
    tickets.filter(t => t.chairNo > 0).forEach((t) => {
      map[t.chairNo] = t;
    });
    return map;
  }, [tickets]);

  // 2. Extract existing baby tickets (chairNo < 0)
  const babyTickets = useMemo(() => {
    return tickets.filter((t) => t.chairNo < 0).sort((a, b) => b.chairNo - a.chairNo);
  }, [tickets]);

  // 3. Calculate the next available baby ID
  // If we have tickets with IDs -1 and -2, the next one should be -3
  const nextBabyId = useMemo(() => {
    const minId = babyTickets.reduce((min, t) => Math.min(min, t.chairNo), 0);
    return minId - 1;
  }, [babyTickets]);

  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < seats.length; i += 4) {
      cols.push(seats.slice(i, i + 4));
    }
    return cols;
  }, [seats]);

  return (
    <div dir="rtl" className="w-full overflow-x-auto p-10 bg-background flex flex-col items-center gap-12">
      {/* Bus Exterior (Existing Grid Logic) */}
      <div className="relative flex w-max min-w-130 flex-row rounded-[2.2rem] border-2 border-border bg-muted/30 p-4 shadow-xl">
        {/* ... (Keep your existing lights, mirrors, driver area, and columns mapping) ... */}
        <div className="ml-4 flex flex-col items-center justify-end border-l border-dashed border-border pl-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground shadow-inner">
            <ShipWheel className="h-6 w-6" />
          </div>
          <span className="mt-1 text-[10px] font-semibold text-muted-foreground">السائق</span>
        </div>
        <div className="flex flex-row gap-3">
          {columns.map((colSeats, colIndex) => {
             const isLastColumn = colIndex === columns.length - 1;
             const topPair = colSeats.slice(0, 2);
             const bottomPair = colSeats.slice(2, 4);
             if (isLastColumn && lastRowFull) {
               return (
                 <div key={colIndex} className="flex flex-col justify-center gap-1 border-r border-border pr-1">
                   {colSeats.map((seat) => (
                     <BusSeat key={seat.id} seat={seat} ticket={ticketMap[seat.id]} onClick={onSeatClick} />
                   ))}
                 </div>
               );
             }
             return (
               <div key={colIndex} className="flex flex-col justify-between">
                 <div className="flex flex-col gap-1">
                   {topPair.map((seat) => (
                     <BusSeat key={seat.id} seat={seat} ticket={ticketMap[seat.id]} onClick={onSeatClick} />
                   ))}
                 </div>
                 <div className="flex h-8 items-center justify-center">
                   <span className="text-[9px] font-mono text-muted-foreground/50">{colIndex + 1}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   {bottomPair.map((seat) => (
                     <BusSeat key={seat.id} seat={seat} ticket={ticketMap[seat.id]} onClick={onSeatClick} />
                   ))}
                 </div>
               </div>
             );
          })}
        </div>
        <div className="absolute -bottom-3 left-20 h-4 w-14 rounded-b-xl bg-neutral-900 dark:bg-gray-400" />
        <div className="absolute -bottom-3 right-24 h-4 w-14 rounded-b-xl bg-neutral-900 dark:bg-gray-400" />
        <div className="absolute -top-3 left-20 h-4 w-14 rounded-t-xl bg-neutral-900 dark:bg-gray-400" />
        <div className="absolute -top-3 right-24 h-4 w-14 rounded-t-xl bg-neutral-900 dark:bg-gray-400" />
      </div>

      {/* Dynamic Baby Tickets Section */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Baby className="h-4 w-4" />
          <span className="text-xs font-bold">تذاكر الأطفال المرافقين</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 p-6 rounded-2xl border-2 border-dashed border-border bg-muted/5 min-w-[300px]">
          {/* 1. Render currently added babies */}
          {babyTickets.map((ticket) => (
            <div key={ticket.chairNo} className="flex flex-col items-center gap-1">
              <BusSeat
                seat={{ id: ticket.chairNo }}
                ticket={ticket}
                onClick={onSeatClick}
              />
            </div>
          ))}

          {/* 2. The "Add New" Button slot */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <BusSeat
                seat={{ id: nextBabyId }}
                ticket={undefined}
                onClick={onSeatClick}
              />
              <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-600 bg-background shadow-sm">
                <Plus className="h-3 w-3 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}