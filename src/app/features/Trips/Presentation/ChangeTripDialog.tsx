import SaveButton from "@/app/core/components/Buttons/SaveButton";
import type { CummonChangeDialogProps } from "@/app/core/components/Dialogs/CummonChangeDialogProps";
import useEntities from "@/app/core/Hooks/useEntities";
import RoutesApiService from "@/app/core/Networking/Services/RoutesApiService";
import TripsApiService from "@/app/core/Networking/Services/TripsApiService";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { arSA as arSADayPicker } from "react-day-picker/locale";
import type { Route } from "../../Routes/Data/Route";
import Bus from "../Bus/Bus";
import type { SeatType } from "../Bus/BusTypes";
import { Ticket } from "../Data/Ticket";
import type { Trip } from "../Data/Trip";
import ChangeTicketDialog from "./ChangeTicketDialog";
import PassengersApiService from "@/app/core/Networking/Services/PassengersApiService";
import type { Passenger } from "../../Passengers/Data/Passenger";
import ChangePassengerDialog from "../../Passengers/Presentation/ChangePassengerDialog";

export default function ChangeTripDialog({
  entity,
  mode,
  onSuccess,
}: CummonChangeDialogProps<Trip>) {
  const [formData, setFormData] = useState<Partial<Trip>>(entity || {});

  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

  const { entities: passengers, refreash: refreshPassengers } = useEntities<Passenger>(new PassengersApiService());
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | undefined>(undefined);
  const [isEditPassengerDialogOpen, setIsEditPassengerDialogOpen] = useState(false);

  const openEditPassengerDialog = (entity: Passenger | undefined) => {
    setSelectedPassenger(entity);
    setIsEditPassengerDialogOpen(true);
  };

  const openTicketDialog = (seat: SeatType) => {
    let ticket = formData.tickets?.find((t) => t.chairNo === seat.id);

    if (ticket == undefined) {
      ticket = new Ticket({
        chairNo: seat.id,
        fromCityId: formData.route?.fromCityId,
        fromCityName: formData.route?.fromCityName,
        toCityId: formData.route?.toCityId,
        toCityName: formData.route?.toCityName,
        issueDate: new Date(),
        issueCityId: formData.route?.fromCityId,
        issueCityName: formData.route?.toCityName,
        amount: formData.ticketPrice,
        paidAmount: formData.ticketPrice,
      });
    }

    setSelectedTicket(ticket);
    setIsTicketDialogOpen(true);
  };

  const { entities: routes, isLoading: fetchingRoutes } = useEntities<Route>(new RoutesApiService());

  const seats: SeatType[] = Array.from({ length: 44 }, (_, i) => ({
    id: i + 1,
  }));

  const changeTicket = (ticket?: Ticket) => {
    if (ticket == undefined) return;

    setFormData((prev) => {
      const exists = prev.tickets?.find(
        (b) => b.id === ticket.id && b.chairNo === ticket.chairNo,
      );

      if (exists) {
        return {
          ...prev,
          tickets: prev.tickets?.map((b) =>
            b.id === ticket.id && b.chairNo === ticket.chairNo ? ticket : b,
          ),
        };
      }

      return {
        ...prev,
        tickets: [ticket, ...(prev.tickets ?? [])],
      };
    });
    setIsTicketDialogOpen(false);
    console.log("formData:", formData, ticket);
  };

  useEffect(() => {
    if (mode === "update" && entity?.id) {
      const getTrip = async () => {
        const service = new TripsApiService();
        const res = await service.Get(entity.id);

        setFormData({
          id: res.data?.id,
          mainCaptainName: res.data?.mainCaptainName,
          secondaryCaptainName: res.data?.secondaryCaptainName,
          busName: res.data?.busName,
          ticketPrice: res.data?.ticketPrice,
          routeId: res.data?.routeId,
          startDate: res.data?.startDate,
          route: res.data?.route,
          tickets: res.data?.tickets,
        });
      };

      getTrip();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity?.id]);

  // ---------- Validation ----------
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const clearError = (field: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validate = (): boolean => {
    const errors: Record<string, boolean> = {};

    // Required fields (based on Trip class and common sense)
    if (!formData.mainCaptainName?.trim()) errors.mainCaptainName = true;
    if (!formData.busName?.trim()) errors.busName = true; // optional? but likely needed
    if (!formData.routeId) errors.routeId = true;
    if (!formData.startDate) errors.startDate = true;
    if (formData.ticketPrice === undefined || formData.ticketPrice <= 0) errors.ticketPrice = true;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const errorInputClass = (hasError: boolean) =>
    hasError ? "border-red-500 ring-red-500" : "";

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
        <aside className="w-80 shrink-0 border-l bg-muted/40 dark:bg-muted/40 p-4 overflow-y-auto">
          <FieldGroup className="space-y-4">
            <Field>
              <Label className="text-xs">رقم الرحلة</Label>
              <Input disabled value={entity?.id} className="h-8 text-xs" />
            </Field>

            <Field>
              <Label className="text-xs">اسم قائد الحافلة</Label>
              <Input
                className={`h-8 text-xs ${errorInputClass(!!fieldErrors.mainCaptainName)}`}
                value={formData.mainCaptainName || ""}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, mainCaptainName: e.target.value }));
                  clearError("mainCaptainName");
                }}
              />
            </Field>

            <Field>
              <Label className="text-xs">مساعد القائد</Label>
              <Input
                className="h-8 text-xs"
                value={formData.secondaryCaptainName || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, secondaryCaptainName: e.target.value }))
                }
              />
            </Field>

            <Field>
              <Label className="text-xs">الحافلة</Label>
              <Input
                className={`h-8 text-xs ${errorInputClass(!!fieldErrors.busName)}`}
                value={formData.busName || ""}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, busName: e.target.value }));
                  clearError("busName");
                }}
              />
            </Field>

            <Field>
              <Label className="text-xs">الخط</Label>
              <Select
                dir="rtl"
                value={formData.routeId?.toString() || ""}
                onValueChange={(val) => {
                  const selected = routes?.data?.find((c) => c.id.toString() === val);
                  if (selected) {
                    setFormData((prev) => ({
                      ...prev,
                      routeId: selected.id,
                      route: selected,
                    }));
                    clearError("routeId");
                  }
                }}
                disabled={fetchingRoutes}
              >
                <SelectTrigger
                  className={`h-8 text-xs ${errorInputClass(!!fieldErrors.routeId)}`}
                >
                  <SelectValue placeholder="اختر خطًا" />
                </SelectTrigger>
                <SelectContent>
                  {routes?.data?.map((route) => (
                    <SelectItem key={route.id} value={route.id.toString()}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label className="text-xs">التاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!formData?.startDate}
                    className={`data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal ${errorInputClass(!!fieldErrors.startDate)}`}
                  >
                    {formData?.startDate ? (
                      format(formData?.startDate, "PPP", { locale: arSA })
                    ) : (
                      <span>إختر تاريخا</span>
                    )}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    captionLayout="dropdown"
                    mode="single"
                    selected={formData?.startDate}
                    onSelect={(date) => {
                      setFormData((prev) => ({ ...prev, startDate: date }));
                      clearError("startDate");
                    }}
                    defaultMonth={formData?.startDate}
                    locale={arSADayPicker}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <Field>
              <Label className="text-xs">مبلغ التذكرة الافتراضي</Label>
              <Input
                type="number"
                className={`h-8 text-xs ${errorInputClass(!!fieldErrors.ticketPrice)}`}
                value={formData.ticketPrice ?? ""}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    ticketPrice: Number(e.target.value),
                  }));
                  clearError("ticketPrice");
                }}
              />
            </Field>
          </FieldGroup>

          <div className="mt-8 flex flex-col gap-2">
            <SaveButton
              formData={formData as Trip}
              dialogMode={mode}
              service={new TripsApiService()}
              onSuccess={onSuccess}
              validation={validate} // This will block save if validation fails
            />
            <DialogClose asChild>
              <Button variant="outline" className="w-full h-8 text-xs">
                إلغاء
              </Button>
            </DialogClose>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-auto flex items-center justify-center bg-background">
          <Bus
            seats={seats}
            tickets={formData.tickets ?? []}
            onSeatClick={openTicketDialog}
            lastRowFull
          />
        </main>
      </div>

      {isTicketDialogOpen && (
        <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
          <ChangeTicketDialog
            entity={selectedTicket}
            passengers={passengers?.data}
            onPassengerDialogClicked={(passenger) => openEditPassengerDialog(passenger)}
            onSuccess={(ticket) => changeTicket(ticket)}
          />
        </Dialog>
      )}

      {isEditPassengerDialogOpen && (
        <Dialog
          open={isEditPassengerDialogOpen}
          onOpenChange={setIsEditPassengerDialogOpen}
        >
          <ChangePassengerDialog
            entity={selectedPassenger || undefined}
            mode={selectedPassenger ? "update" : "create"}
            onSuccess={(data) => {
              refreshPassengers(data);
              setSelectedTicket((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  passengerId: data.id,
                  passenger: data,
                };
              });
              setIsEditPassengerDialogOpen(false);
            }}
          />
        </Dialog>
      )}
    </DialogContent>
  );
}