import type { Ticket } from "../Data/Ticket";

export interface SeatType {
  id: number;
  price?: number;
}

export interface SeatProps {
  seat: SeatType;
  ticket?: Ticket;
  onClick: (seat: SeatType) => void;
  highlighted?: boolean;
  isDimmed?: boolean;
  onHoverData?: (type: 'nationality' | 'from' | 'to' | 'amount' | null, value?: string) => void;
}

export interface BusProps {
  seats: SeatType[];
  tickets: Ticket[];
  onSeatClick: (seat: SeatType) => void;
  lastRowFull?: boolean; // If true, the back of the bus has 5 seats (no aisle)
}