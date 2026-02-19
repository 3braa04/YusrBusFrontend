import { ShipWheel, Baby, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import BusSeat from "./BusSeat";
import type { BusProps, SeatType } from "./BusTypes";
import type { Ticket } from "../Data/Ticket";

export default function BusLayout({
  seats,
  tickets,
  onSeatClick,
  lastRowFull = false,
}: BusProps) {
  // --- State for Highlighting ---
  const [hoverFilter, setHoverFilter] = useState<{ type: string; value: string } | undefined>(undefined);

  // --- Memoized Maps ---
  const ticketMap = useMemo(() => {
    const map: Record<number, Ticket> = {};
    tickets.filter(t => t.chairNo > 0).forEach((t) => {
      map[t.chairNo] = t;
    });
    return map;
  }, [tickets]);

  const babyTickets = useMemo(() => {
    return tickets.filter((t) => t.chairNo < 0).sort((a, b) => b.chairNo - a.chairNo);
  }, [tickets]);

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

  // --- Helper Functions ---
  const handleHover = (type: any, value?: string) => {
    if (!type) setHoverFilter(undefined);
    else setHoverFilter({ type, value: value || '' });
  };

  const getHighlightStatus = (ticket?: Ticket) => {
    if (!hoverFilter) return { isHighlighted: false, isDimmed: false };
    if (!ticket) return { isHighlighted: false, isDimmed: true };
    
    let match = false;
    if (hoverFilter.type === 'nationality') 
      match = ticket.passenger?.nationality?.name === hoverFilter.value;
    if (hoverFilter.type === 'from') 
      match = ticket.fromCityName === hoverFilter.value;
    if (hoverFilter.type === 'to') 
      match = ticket.toCityName === hoverFilter.value;
    if (hoverFilter.type === 'amount') 
      match = ticket.amount.toString() === hoverFilter.value;

    return { isHighlighted: match, isDimmed: !match };
  };

  const renderSeat = (seat: SeatType, ticket?: Ticket) => {
    const { isHighlighted, isDimmed } = getHighlightStatus(ticket);
    return (
      <BusSeat 
        key={seat.id} 
        seat={seat} 
        ticket={ticket} 
        onClick={onSeatClick}
        highlighted={isHighlighted}
        isDimmed={isDimmed}
        onHoverData={handleHover}
      />
    );
  };

  return (
    <div dir="rtl" className="w-full overflow-x-auto p-10 bg-background flex flex-col items-center gap-12">
      
      {/* Bus Exterior Structure */}
      <div className="relative flex w-max min-w-130 flex-row rounded-[2.2rem] border-2 border-border bg-muted/30 p-4 shadow-xl">
        
        {/* Lights & Mirrors */}
        <div className="absolute -right-1 top-10 h-8 w-2 rounded-l-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
        <div className="absolute -right-1 bottom-10 h-8 w-2 rounded-l-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
        <div className="absolute -top-5 right-12 flex flex-col items-center">
          <div className="h-2 w-1 bg-gray-400" />
          <div className="h-4 w-6 rounded-t-sm bg-gray-800 dark:bg-gray-600 border border-gray-400" />
        </div>
        <div className="absolute -left-1 top-10 h-8 w-2 rounded-r-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
        <div className="absolute -left-1 bottom-10 h-8 w-2 rounded-r-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
        <div className="absolute -bottom-5 right-12 flex flex-col items-center">
          <div className="h-4 w-6 rounded-b-sm bg-gray-800 dark:bg-gray-600 border border-gray-400" />
          <div className="h-2 w-1 bg-gray-400" />
        </div>

        {/* Driver Area */}
        <div className="ml-4 flex flex-col items-center justify-end border-l border-dashed border-border pl-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground shadow-inner">
            <ShipWheel className="h-6 w-6" />
          </div>
          <span className="mt-1 text-[10px] font-semibold text-muted-foreground">السائق</span>
        </div>

        {/* Passenger Grid */}
        <div className="flex flex-row gap-3">
          {columns.map((colSeats, colIndex) => {
            const isLastColumn = colIndex === columns.length - 1;
            const topPair = colSeats.slice(0, 2);
            const bottomPair = colSeats.slice(2, 4);

            if (isLastColumn && lastRowFull) {
              return (
                <div key={colIndex} className="flex flex-col justify-center gap-1 border-r border-border pr-1">
                  {colSeats.map((seat) => renderSeat(seat, ticketMap[seat.id]))}
                </div>
              );
            }

            return (
              <div key={colIndex} className="flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  {topPair.map((seat) => renderSeat(seat, ticketMap[seat.id]))}
                </div>
                <div className="flex h-8 items-center justify-center text-[9px] font-mono text-muted-foreground/50">
                  {colIndex + 1}
                </div>
                <div className="flex flex-col gap-1">
                  {bottomPair.map((seat) => renderSeat(seat, ticketMap[seat.id]))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Wheels */}
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
        
        <div className="flex flex-wrap justify-center gap-6 p-6 rounded-2xl border-2 border-dashed border-border bg-muted/5 min-w-75">
          {/* Existing Baby Seats */}
          {babyTickets.map((ticket) => renderSeat({ id: ticket.chairNo }, ticket))}

          {/* Add New Baby Seat */}
          <div className="relative">
            {renderSeat({ id: nextBabyId }, undefined)}
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-600 bg-background pointer-events-none">
              <Plus className="h-3 w-3 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}