import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { arSA as arSADayPicker } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { DialogClose } from "@/components/ui/dialog";
import SaveButton from "@/app/core/components/Buttons/SaveButton";
import TripsApiService from "@/app/core/Networking/Services/TripsApiService";
import type { Trip } from "../Data/Trip";
import type { Route } from "../../Routes/Data/Route";
import TripStationsList from "./TripStationsList";
import {
  useFormValidation,
  type ValidationRule,
} from "@/app/core/Hooks/useFormValidation";
import { Validators } from "@/app/core/utils/Validators";
import { cn } from "@/lib/utils";

interface TripSidePanelProps {
  entityId?: number;
  formData: Partial<Trip>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Trip>>>;
  routes?: Route[];
  fetchingRoutes: boolean;
  onSuccess: (data: Trip) => void;
  mode: "create" | "update";
}

export default function TripSidePanel({
  entityId,
  formData,
  setFormData,
  routes,
  fetchingRoutes,
  onSuccess,
  mode,
}: TripSidePanelProps) {
  const validationRules: ValidationRule<Partial<Trip>>[] = [
    {
      field: "mainCaptainName",
      selector: (d) => d.mainCaptainName,
      validators: [Validators.required("يرجى إدخال اسم قائد الحافلة")],
    },

    {
      field: "startDate",
      selector: (d) => d.startDate,
      validators: [Validators.required("يرجى إدخال تاريخ ووقت التحرك")],
    },
    {
      field: "ticketPrice",
      selector: (d) => d.ticketPrice,
      validators: [Validators.required("يرجى إدخال سعر التذكرة")],
    },

    {
      field: "routeId",
      selector: (d) => d.routeId,
      validators: [Validators.required("يرجى تحديد خط السفر")],
    },
  ];

  const { getError, isInvalid, validate, clearError, errorInputClass } =
    useFormValidation(formData, validationRules);

  return (
    <aside className="w-80 flex flex-col justify-between shrink-0 border-l bg-muted/40 dark:bg-muted/40 p-4 overflow-y-auto">
      <FieldGroup>
        <Field>
          <Label className="text-xs">رقم الرحلة</Label>
          <Input disabled value={entityId || ""} className="h-8 text-xs" />
        </Field>

        <Field>
          <Label className="text-xs">اسم قائد الحافلة</Label>
          <Input
            className={`h-8 text-xs ${errorInputClass("mainCaptainName")}`}
            value={formData.mainCaptainName || ""}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                mainCaptainName: e.target.value,
              }));
              clearError("mainCaptainName");
            }}
          />
          {isInvalid("mainCaptainName") && (
            <span className="text-xs text-red-500">
              {getError("mainCaptainName")}
            </span>
          )}
        </Field>

        <Field>
          <Label className="text-xs">مساعد القائد</Label>
          <Input
            className="h-8 text-xs"
            value={formData.secondaryCaptainName || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                secondaryCaptainName: e.target.value,
              }))
            }
          />
        </Field>

        <Field>
          <Label className="text-xs">الحافلة</Label>
          <Input
            className={'h-8 text-xs'}
            value={formData.busName || ""}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, busName: e.target.value }));
            }}
          />
        </Field>

        <div className={"flex gap-2"}>
          <Field className="flex-1">
            <Label className="text-xs">تاريخ التحرك</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-8 w-full justify-between text-left text-xs font-normal border",
                    !formData.startDate && "text-muted-foreground",
                    isInvalid("startDate") && "border-red-500! ring-red-500! text-red-900!"
                  )}
                >
                  {formData.startDate instanceof Date ? (
                    format(formData.startDate, "yyyy-MM-dd")
                  ) : (
                    <span>إختر تاريخا</span>
                  )}
                  <ChevronDownIcon className="h-3 w-3 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar 
                  mode="single"
                  captionLayout="dropdown"
                  selected={
                    formData.startDate instanceof Date
                      ? formData.startDate
                      : undefined
                  }
                  onSelect={(newDate) => {
                    if (!newDate) return;
                    setFormData((prev) => {
                      const dateWithTime = new Date(newDate);
                      if (prev.startDate instanceof Date) {
                        dateWithTime.setHours(
                          prev.startDate.getHours(),
                          prev.startDate.getMinutes(),
                        );
                        clearError("startDate");
                      }
                      return { ...prev, startDate: dateWithTime };
                    });
                  }}
                  locale={arSADayPicker}
                />
              </PopoverContent>
            </Popover>
            {isInvalid("startDate") && (
              <span className="text-xs text-red-500">
                {getError("startDate")}
              </span>
            )}
          </Field>

          <Field className="w-24">
            <Label className="text-xs">الوقت</Label>
            <Input
              type="time"
              className={`h-8 text-xs bg-background appearance-none ${errorInputClass("startDate")}`}
              value={
                formData.startDate instanceof Date
                  ? format(formData.startDate, "HH:mm")
                  : ""
              }
              onChange={(e) => {
                const timeVal = e.target.value;
                if (!timeVal) return;
                const [hours, minutes] = timeVal.split(":").map(Number);
                setFormData((prev) => {
                  const newDate =
                    prev.startDate instanceof Date
                      ? new Date(prev.startDate)
                      : new Date();
                  newDate.setHours(hours, minutes, 0, 0);
                  return { ...prev, startDate: newDate };
                });
              }}
            />
          </Field>
        </div>

        <Field>
          <Label className="text-xs">مبلغ التذكرة الافتراضي</Label>
          <Input
            type="number"
            className={`h-8 text-xs ${errorInputClass("ticketPrice")}`}
            value={formData.ticketPrice ?? ""}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                ticketPrice: Number(e.target.value),
              }));
              clearError("ticketPrice");
            }}
          />
          {isInvalid("ticketPrice") && (
            <span className="text-xs text-red-500">
              {getError("ticketPrice")}
            </span>
          )}
        </Field>

        <Field>
          <Label className="text-xs">الخط</Label>
          <Select
            dir="rtl"
            value={formData.routeId?.toString() || ""}
            onValueChange={(val) => {
              const selected = routes?.find((c) => c.id.toString() === val);
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
              className={`h-8 text-xs ${errorInputClass("routeId")}`}
            >
              <SelectValue placeholder="اختر خطًا" />
            </SelectTrigger>
            <SelectContent>
              {routes?.map((route) => (
                <SelectItem key={route.id} value={route.id.toString()}>
                  {route.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isInvalid("routeId") && (
            <span className="text-xs text-red-500">{getError("routeId")}</span>
          )}
        </Field>

        {/* The Station Schedule List */}
        <TripStationsList
          stations={formData.route?.routeStations}
          startDate={formData.startDate}
        />
      </FieldGroup>

      <div className="mt-8 flex flex-col gap-2">
        <SaveButton
          formData={formData as Trip}
          dialogMode={mode}
          service={new TripsApiService()}
          onSuccess={onSuccess}
          validation={validate}
        />
        <DialogClose asChild>
          <Button variant="outline" className="w-full h-8 text-xs">
            إلغاء
          </Button>
        </DialogClose>
      </div>
    </aside>
  );
}
