import TripsApiService from "@/app/core/Networking/Services/TripsApiService";
import type { Ticket } from "@/app/features/Trips/Data/Ticket";
import type { Trip } from "@/app/features/Trips/Data/Trip";
import { useEffect, useState } from "react";

export function useTripForm(entity: Trip | undefined, mode: string) {
  const [formData, setFormData] = useState<Partial<Trip>>(entity || {});
  const [movingTicket, setMovingTicket] = useState<Ticket | undefined>(
    undefined,
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [initLoading, setInitLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && entity?.id) {
      setInitLoading(true);
      new TripsApiService().Get(entity.id).then((res) => {
        if (res.data)
          setFormData({
            ...res.data,
            startDate: res.data.startDate
              ? new Date(res.data.startDate)
              : undefined,
          });

          setInitLoading(false);
        });
    }
  }, [entity?.id, mode]);

  const validate = () => {
    const errors: Record<string, boolean> = {};
    if (!formData.mainCaptainName?.trim()) errors.mainCaptainName = true;
    if (!formData.busName?.trim()) errors.busName = true;
    if (!formData.routeId) errors.routeId = true;
    if (!formData.startDate) errors.startDate = true;
    if (formData.ticketPrice === undefined || formData.ticketPrice <= 0)
      errors.ticketPrice = true;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateTicketChair = (
    ticketId: number | undefined,
    chairNo: number,
    newSeatId: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      tickets: prev.tickets?.map((t) =>
        (t.id === ticketId && t.id !== undefined) || t.chairNo === chairNo
          ? { ...t, chairNo: newSeatId }
          : t,
      ),
    }));
    setMovingTicket(undefined);
  };

  return {
    formData,
    setFormData,
    movingTicket,
    setMovingTicket,
    fieldErrors,
    setFieldErrors,
    validate,
    updateTicketChair,
    initLoading
  };
}
