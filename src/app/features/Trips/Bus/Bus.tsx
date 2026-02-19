import { ShipWheel } from "lucide-react";
import { useMemo } from "react";
import BusSeat from "./BusSeat";
import type { BusProps } from "./BusTypes";

export default function BusLayout({
  seats,
  tickets,
  onSeatClick,
  lastRowFull = false,
}: BusProps) {
  const ticketMap = useMemo(() => {
    const map: Record<number, any> = {};
    tickets.forEach((t) => {
      map[t.chairNo] = t;
    });
    return map;
  }, [tickets]);

  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < seats.length; i += 4) {
      cols.push(seats.slice(i, i + 4));
    }
    return cols;
  }, [seats]);

  return (
    <div dir="rtl" className="w-full overflow-x-auto p-10 bg-background">
      {/* هيكل الباص الخارجي */}
      <div className="relative mx-auto flex w-max min-w-130 flex-row rounded-[2.2rem] border-2 border-border bg-muted/30 p-4 shadow-xl">
        
        {/* --- الإضافات الجديدة: المصابيح الأمامية --- */}
        <div className="absolute -right-1 top-10 h-8 w-2 rounded-l-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
        <div className="absolute -right-1 bottom-10 h-8 w-2 rounded-l-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />

        {/* --- الإضافات الجديدة: المرايا الجانبية --- */}
        {/* مرآة علوية */}
        <div className="absolute -top-5 right-12 flex flex-col items-center">
          <div className="h-2 w-1 bg-gray-400" /> {/* ذراع المرآة */}
          <div className="h-4 w-6 rounded-t-sm bg-gray-800 dark:bg-gray-600 border border-gray-400" />
        </div>

        {/* --- الإضافة الجديدة: المصابيح الخلفية (جهة اليسار) --- */}
        <div className="absolute -left-1 top-10 h-8 w-2 rounded-r-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
        <div className="absolute -left-1 bottom-10 h-8 w-2 rounded-r-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]" />

        {/* مرآة سفلية */}
        <div className="absolute -bottom-5 right-12 flex flex-col items-center">
          <div className="h-4 w-6 rounded-b-sm bg-gray-800 dark:bg-gray-600 border border-gray-400" />
          <div className="h-2 w-1 bg-gray-400" /> {/* ذراع المرآة */}
        </div>

        {/* منطقة السائق */}
        <div className="ml-4 flex flex-col items-center justify-end border-l border-dashed border-border pl-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground shadow-inner">
            <ShipWheel className="h-6 w-6" />
          </div>
          <span className="mt-1 text-[10px] font-semibold text-muted-foreground">
            السائق
          </span>
        </div>

        {/* منطقة الركاب */}
        <div className="flex flex-row gap-3">
          {columns.map((colSeats, colIndex) => {
            const isLastColumn = colIndex === columns.length - 1;
            const topPair = colSeats.slice(0, 2);
            const bottomPair = colSeats.slice(2, 4);

            if (isLastColumn && lastRowFull) {
              return (
                <div
                  key={colIndex}
                  className="flex flex-col justify-center gap-1 border-r border-border pr-1"
                >
                  {colSeats.map((seat) => (
                    <BusSeat
                      key={seat.id}
                      seat={seat}
                      ticket={ticketMap[seat.id]}
                      onClick={onSeatClick}
                    />
                  ))}
                </div>
              );
            }

            return (
              <div key={colIndex} className="flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  {topPair.map((seat) => (
                    <BusSeat
                      key={seat.id}
                      seat={seat}
                      ticket={ticketMap[seat.id]}
                      onClick={onSeatClick}
                    />
                  ))}
                </div>
                <div className="flex h-8 items-center justify-center">
                  <span className="text-[9px] font-mono text-muted-foreground/50">
                    {colIndex + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {bottomPair.map((seat) => (
                    <BusSeat
                      key={seat.id}
                      seat={seat}
                      ticket={ticketMap[seat.id]}
                      onClick={onSeatClick}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* عجلات زخرفية */}
        <div className="absolute -bottom-3 left-20 h-4 w-14 rounded-b-xl bg-neutral-900 dark:bg-gray-400" />
        <div className="absolute -bottom-3 right-24 h-4 w-14 rounded-b-xl bg-neutral-900 dark:bg-gray-400" />
        <div className="absolute -top-3 left-20 h-4 w-14 rounded-t-xl bg-neutral-900 dark:bg-gray-400" />
        <div className="absolute -top-3 right-24 h-4 w-14 rounded-t-xl bg-neutral-900 dark:bg-gray-400" />
      </div>
    </div>
  );
}