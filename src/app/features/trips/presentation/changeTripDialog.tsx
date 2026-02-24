import type { CummonChangeDialogProps } from "@/app/core/components/dialogs/cummonChangeDialogProps";
import Loading from "@/app/core/components/loading/loading";
import useEntities from "@/app/core/hooks/useEntities";
import { useTripForm } from "@/app/core/hooks/useTripForm";
import PassengersApiService from "@/app/core/networking/services/passengersApiService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import type { Passenger } from "../../passengers/data/passenger";
import ChangePassengerDialog from "../../passengers/presentation/changePassengerDialog";
import Bus from "../bus/bus";
import type { SeatType } from "../bus/busTypes";
import { Ticket } from "../data/ticket";
import type { Trip } from "../data/trip";
import ChangeTicketDialog from "./changeTicketDialog";
import TripSidePanel from "./tripSidePanel";

export default function ChangeTripDialog({ entity, mode, onSuccess }: CummonChangeDialogProps<Trip>) {
  const {
    formData, 
    setFormData,
    movingTicket, 
    setMovingTicket,
    updateTicketChair,
    initLoading
  } = useTripForm(entity, mode);

  // Modal States
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | undefined>(undefined);
  const [isEditPassengerDialogOpen, setIsEditPassengerDialogOpen] = useState(false);

  // APIs
  const { entities: passengers, refreash: refreshPassengers, filter:filterPassengers, isLoading: fetchingPassengers } = useEntities<Passenger>(new PassengersApiService());

  const handleSeatClick = (seat: SeatType) => {
    // 1. Move Logic
    if (movingTicket) {
      const isOccupied = formData.tickets?.some((t) => t.chairNo === seat.id);
      if (!isOccupied) {
        updateTicketChair(movingTicket.id, movingTicket.chairNo, seat.id);
      } else {
        setMovingTicket(undefined);
      }
      return;
    }

    // 2. Open Ticket Logic
    let ticket = formData.tickets?.find((t) => t.chairNo === seat.id);
    if (!ticket) {
      ticket = new Ticket({
        chairNo: seat.id,
        fromCityId: formData.route?.fromCityId,
        fromCityName: formData.route?.fromCityName,
        toCityId: formData.route?.toCityId,
        toCityName: formData.route?.toCityName,
        issueCityId: formData.route?.fromCityId,
        issueCityName: formData.route?.fromCityName,
        issueDate: new Date(),
        amount: formData.ticketPrice,
        paidAmount: formData.ticketPrice,
      });
    }
    setSelectedTicket(ticket);
    setIsTicketDialogOpen(true);
  };

  const handleTicketUpdate = (updatedTicket: Ticket) => {
    setFormData((prev) => {
      const tickets = [...(prev.tickets || [])];
      const index = tickets.findIndex(t => t.chairNo === updatedTicket.chairNo);
      
      if (index > -1) tickets[index] = updatedTicket;
      else tickets.push(updatedTicket);

      return { ...prev, tickets };
    });
    
    setIsTicketDialogOpen(false);
  };

  if (initLoading) {
    return (
      <DialogContent dir="rtl" >
        <Loading entityName="الرحلة"/>
      </DialogContent>
    );
  }

  return (
    <DialogContent dir="rtl" className="sm:max-w-[90vw] sm:w-[90vw] sm:h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
      <DialogHeader className="p-4 border-b">
        <DialogTitle>{mode === "create" ? "إضافة" : "تعديل"} رحلة</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="flex flex-1 overflow-hidden">
        <TripSidePanel
          entityId={entity?.id}
          formData={formData}
          setFormData={setFormData}
          onSuccess={(trip) => onSuccess?.(trip)}
          mode={mode}
        />

        <main className="flex-1 p-6 overflow-auto flex items-center justify-center bg-background">
          <Bus
          isLoading = {initLoading}
            seats={Array.from({ length: 44 }, (_, i) => ({ id: i + 1 }))}
            tickets={formData.tickets ?? []}
            onSeatClick={handleSeatClick}
            onMoveTicket={(t) => setMovingTicket(t || undefined)}
            movingTicketId={movingTicket?.id || movingTicket?.chairNo}
            onDeleteTicket={(id) => setFormData(p => ({ ...p, tickets: p.tickets?.filter(t => t.id !== id) }))}
            lastRowFull
          />
        </main>
      </div>

      {/* Nested Ticket Dialog */}
      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        {isTicketDialogOpen && (
          <ChangeTicketDialog
            entity={selectedTicket}
            passengers={passengers?.data}
            filterPassengers={filterPassengers}
            fetchingPassengers={fetchingPassengers}
            onPassengerDialogClicked={(p) => {
              setSelectedPassenger(p);
              setIsEditPassengerDialogOpen(true);
            }}
            onSuccess={handleTicketUpdate}
          />
        )}
      </Dialog>

      {/* Nested Passenger Dialog */}
      <Dialog open={isEditPassengerDialogOpen} onOpenChange={setIsEditPassengerDialogOpen}>
        {isEditPassengerDialogOpen && (
          <ChangePassengerDialog
            entity={selectedPassenger}
            mode={selectedPassenger ? "update" : "create"}
            onSuccess={(data) => {
              refreshPassengers(data);
              setSelectedTicket(prev => prev ? { ...prev, passengerId: data.id, passenger: data } : prev);
              setIsEditPassengerDialogOpen(false);
            }}
          />
        )}
      </Dialog>
    </DialogContent>
  );
}