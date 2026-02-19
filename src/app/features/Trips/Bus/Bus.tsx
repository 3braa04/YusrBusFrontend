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
    <div dir="rtl" className="w-full overflow-x-auto p-3 bg-background">

      {/* هيكل الباص */}
      <div className="relative mx-auto flex w-max min-w-[520px] flex-row rounded-[2.2rem] border border-border bg-muted/30 p-4 shadow-md">

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

                {/* الصف العلوي */}
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

                {/* الممر */}
                <div className="flex h-8 items-center justify-center">
                  <span className="text-xs font-mono text-muted-foreground">
                    صف {colIndex + 1}
                  </span>
                </div>

                {/* الصف السفلي */}
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
        <div className="absolute -bottom-2 left-20 h-3 w-12 rounded-b-lg bg-black dark:bg-gray-300" />
        <div className="absolute -bottom-2 right-20 h-3 w-12 rounded-b-lg bg-black dark:bg-gray-300" />
        <div className="absolute -top-2 left-20 h-3 w-12 rounded-t-lg bg-black dark:bg-gray-300" />
        <div className="absolute -top-2 right-20 h-3 w-12 rounded-t-lg bg-black dark:bg-gray-300" />
      </div>

    </div>
  );
}