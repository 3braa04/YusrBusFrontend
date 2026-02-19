import type { Ticket } from "../Data/Ticket";

export type SeatStatus = 'available' | 'selected' | 'booked';

export interface SeatType {
  id: number;
  status?: SeatStatus; // Optional, defaults to 'available'
  price?: number;
}

export interface BusProps {
  seats: SeatType[];
  tickets: Ticket[];
  onSeatClick: (seat: SeatType) => void;
  lastRowFull?: boolean; // If true, the back of the bus has 5 seats (no aisle)
}