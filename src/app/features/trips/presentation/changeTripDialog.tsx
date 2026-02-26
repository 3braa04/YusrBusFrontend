import type { CummonChangeDialogProps } from "@/app/core/components/dialogs/cummonChangeDialogProps";
import Loading from "@/app/core/components/loading/loading";
import useEntities from "@/app/core/hooks/useEntities";
import { useTripForm } from "@/app/core/hooks/useTripForm";
import PassengersApiService from "@/app/core/networking/services/passengersApiService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { Passenger } from "../../passengers/data/passenger";
import ChangePassengerDialog from "../../passengers/presentation/changePassengerDialog";
import Bus from "../bus/bus";
import type { SeatType } from "../bus/busTypes";
import { Ticket } from "../data/ticket";
import type { Trip } from "../data/trip";
import ChangeTicketDialog from "./changeTicketDialog";
import TripSidePanel from "./tripSidePanel";
import TripAmountSummary from "./TripAmountSummary";
import ChangeDepositDialog from "./changeDepositDialog";
import { Archive, Box, PackagePlus, X } from "lucide-react";

export default function ChangeTripDialog({
  entity,
  mode,
  onSuccess,
}: CummonChangeDialogProps<Trip>) {
  const {
    formData,
    setFormData,
    movingTicket,
    setMovingTicket,
    updateTicketChair,
    initLoading,
  } = useTripForm(entity, mode);

  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  // Modal States
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(
    undefined,
  );
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState<
    Passenger | undefined
  >(undefined);
  const [isEditPassengerDialogOpen, setIsEditPassengerDialogOpen] =
    useState(false);

  // APIs
  const {
    entities: passengers,
    refreash: refreshPassengers,
    filter: filterPassengers,
    isLoading: fetchingPassengers,
  } = useEntities<Passenger>(new PassengersApiService());

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
      const index = tickets.findIndex(
        (t) => t.chairNo === updatedTicket.chairNo,
      );

      if (index > -1) tickets[index] = updatedTicket;
      else tickets.push(updatedTicket);

      return { ...prev, tickets };
    });

    setIsTicketDialogOpen(false);
  };

  if (initLoading) {
    return (
      <DialogContent dir="rtl">
        <Loading entityName="الرحلة" />
      </DialogContent>
    );
  }

  return (
    <DialogContent
      dir="rtl"
      className="sm:max-w-[90vw] sm:w-[90vw] sm:h-[90vh] flex flex-col p-0 gap-0 overflow-hidden"
    >
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

        <main className="flex-1 overflow-hidden flex flex-col bg-background">
          <TripAmountSummary tickets={formData.tickets ?? []} />

          <div className="flex-1 overflow-auto flex flex-col items-center p-6 gap-4 min-w-0">
            {/* Bus */}
            <div className="flex items-center justify-center shrink-0">
              <Bus
                isLoading={initLoading}
                seats={Array.from({ length: 44 }, (_, i) => ({ id: i + 1 }))}
                tickets={formData.tickets ?? []}
                onSeatClick={handleSeatClick}
                onMoveTicket={(t) => setMovingTicket(t || undefined)}
                movingTicketId={movingTicket?.id || movingTicket?.chairNo}
                onDeleteTicket={(id) =>
                  setFormData((p) => ({
                    ...p,
                    tickets: p.tickets?.filter((t) => t.id !== id),
                  }))
                }
                lastRowFull
              />
            </div>

            {/* Deposits Box */}
            <div className="w-52 h-48 shrink-0 flex flex-col rounded-xl bg-amber-950/20 border border-amber-800/30 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-amber-800/30 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Archive className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300">
                    الأمانات ({formData.deposit?.length ?? 0})
                  </span>
                </div>
                <Dialog
                  open={isDepositDialogOpen}
                  onOpenChange={setIsDepositDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-[10px] font-bold transition-colors">
                      <PackagePlus className="w-3 h-3" />
                      إضافة
                    </button>
                  </DialogTrigger>
                  <ChangeDepositDialog
                    onSuccess={(dep) => {
                      setFormData((prev) => ({
                        ...prev,
                        deposit: [...(prev.deposit ?? []), dep],
                      }));
                      setIsDepositDialogOpen(false);
                    }}
                  />
                </Dialog>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 flex flex-col gap-1.5">
                {!formData.deposit?.length ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
                    <Box className="w-8 h-8 text-amber-800/50" />
                    <p className="text-[10px] text-amber-700/60">
                      لا توجد أمانات
                    </p>
                  </div>
                ) : (
                  formData.deposit.map((dep, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-amber-950/50 border border-amber-700/30 group"
                    >
                      {dep.image?.url || dep.image?.base64File ? (
                        <img
                          src={
                            dep.image.url ||
                            `data:${dep.image.contentType};base64,${dep.image.base64File}`
                          }
                          className="w-6 h-6 rounded object-cover border border-amber-700/40 shrink-0"
                        />
                      ) : (
                        <Box className="w-4 h-4 text-amber-600/50 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0 leading-tight">
                        <p className="text-[11px] font-semibold text-amber-100 truncate">
                          {dep.description}
                        </p>
                        <p className="text-[9px] text-amber-500/70 truncate">
                          {dep.sender} ← {dep.recipient}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            deposit: prev.deposit?.filter(
                              (_, idx) => idx !== i,
                            ),
                          }))
                        }
                        className="w-4 h-4 rounded flex items-center justify-center text-red-500/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
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
      <Dialog
        open={isEditPassengerDialogOpen}
        onOpenChange={setIsEditPassengerDialogOpen}
      >
        {isEditPassengerDialogOpen && (
          <ChangePassengerDialog
            entity={selectedPassenger}
            mode={selectedPassenger ? "update" : "create"}
            onSuccess={(data) => {
              refreshPassengers(data);
              setSelectedTicket((prev) =>
                prev
                  ? { ...prev, passengerId: data.id, passenger: data }
                  : prev,
              );
              setIsEditPassengerDialogOpen(false);
            }}
          />
        )}
      </Dialog>
    </DialogContent>
  );
}
