import type { SeatType } from './BusTypes';

interface SeatProps {
  seat: SeatType;
  onClick: (seat: SeatType) => void;
}

export default function Seat({ seat, onClick }: SeatProps){
  return (
    <button
      onClick={() => onClick(seat)}
      className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center text-sm font-medium text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {seat.id}
    </button>
  );
};