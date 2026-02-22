import type { SeatType } from './busTypes';

interface SeatProps {
  seat: SeatType;
  onClick: (seat: SeatType) => void;
}

export default function Seat({ seat, onClick }: SeatProps){
  return (
    <button
      onClick={() => onClick(seat)}
      className="p-3 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center text-sm font-medium text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      
      <div className='flex flex-col text-xs'>

        <span>
          {seat.id}
        </span>

        <span>
          name
        </span>

        <span>
          nationality
        </span>

        <span>
          gender
        </span>

        <span>
          to city
        </span>

        <span>
          age
        </span>

      </div>
      
    </button>
  );
};