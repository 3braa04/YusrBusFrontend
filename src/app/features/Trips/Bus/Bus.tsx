import type { BusProps, SeatType } from './BusTypes';
import Seat from './Seat'
export default function Bus({
  seats,
  onSeatClick,
  lastRowFull = false,
}: BusProps){
  // Split seats into rows of up to 4 seats each
  const rows: SeatType[][] = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <div className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-md max-w-md mx-auto">
      <div className="flex flex-col items-center space-y-4">
        {rows.map((rowSeats, rowIndex) => {
          const isLastRow = rowIndex === rows.length - 1;
          const useFullWidth = isLastRow && lastRowFull && rowSeats.length === 4;

          // Split row into left and right pairs
          const leftSeats = rowSeats.slice(0, 2);
          const rightSeats = rowSeats.slice(2, 4);

          return (
            <div key={rowIndex} className="flex justify-center w-full">
              {useFullWidth ? (
                // Last row as a continuous block of 4 seats
                <div className="flex justify-center gap-4">
                  {rowSeats.map((seat) => (
                    <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
                  ))}
                </div>
              ) : (
                // Standard row: left pair, aisle gap, right pair (if present)
                <div className="flex items-center gap-8">
                  {/* Left pair */}
                  {leftSeats.length > 0 && (
                    <div className="flex gap-4">
                      {leftSeats.map((seat) => (
                        <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
                      ))}
                    </div>
                  )}

                  {/* Aisle – only shown when both sides have seats */}
                  {leftSeats.length > 0 && rightSeats.length > 0 && (
                    <div className="w-4" aria-hidden="true" />
                  )}

                  {/* Right pair */}
                  {rightSeats.length > 0 && (
                    <div className="flex gap-4">
                      {rightSeats.map((seat) => (
                        <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};