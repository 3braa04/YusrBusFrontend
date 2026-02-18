export interface SeatType {
  id: string | number;   
}

export interface BusProps {
  seats: SeatType[];             // Array of seat objects to render
  onSeatClick: (seat: SeatType) => void;  // Callback when a seat is clicked
  lastRowFull?: boolean;     // If true, the last row (if it has 4 seats) renders as a full block without an aisle
}