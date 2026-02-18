import Bus from "./Bus/Bus";
import type { SeatType } from "./Bus/BusTypes";


export default function TripsScreen(){
const seats: SeatType[] = Array.from({ length: 44 }, (_, i) => ({
    id: i + 1,
  }));

  const handleSeatClick = (seat: SeatType) => {
    console.log(`Seat ${seat.id} clicked`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Bus Layout</h1>
      <Bus seats={seats} onSeatClick={handleSeatClick} lastRowFull />
    </div>
  );
};

