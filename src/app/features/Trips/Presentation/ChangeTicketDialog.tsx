import useCities from "@/app/core/Hooks/useCities";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { ChevronDownIcon, Edit, PlusCircle } from "lucide-react";
import { useState } from "react";
import { arSA as arSADayPicker } from "react-day-picker/locale";
import type { Passenger } from "../../Passengers/Data/Passenger";
import type { Ticket } from "../Data/Ticket";

type ChangeTicketDialogProps = {
  entity?: Ticket;
  passengers?: Passenger[];
  onPassengerDialogClicked?: (passenger?: Passenger) => void;
  onSuccess?: (newData?: Ticket) => void;
};

export default function ChangeTicketDialog({
  entity,
  passengers,
  onPassengerDialogClicked,
  onSuccess,
}: ChangeTicketDialogProps) {
  const [formData, setFormData] = useState<Partial<Ticket>>(entity || {});
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const { cities, fetchingCities } = useCities();

  // Helper to clear a specific field error
  const clearError = (field: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
  };

  // Validate all required fields, return true if valid
  const validate = (): boolean => {
    const errors: Record<string, boolean> = {};

    // Check each required field
    if (!formData.passengerId) errors.passengerId = true;
    if (!formData.fromCityId) errors.fromCityId = true;
    if (!formData.toCityId) errors.toCityId = true;
    if (formData.amount == null || isNaN(formData.amount)) errors.amount = true;
    if (formData.paidAmount == null || isNaN(formData.paidAmount))
      errors.paidAmount = true;
    if (!formData.issueDate) errors.issueDate = true;
    if (!formData.issueCityId) errors.issueCityId = true;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  function onSaveHandler() {
    if (!validate()) return; // stop if invalid
    onSuccess?.(formData as Ticket);
  }

  // Reusable class for error border
  const errorInputClass = (hasError: boolean) =>
    hasError ? "border-red-500 ring-red-500" : "";

  return (
    <DialogContent dir="rtl" className="sm:max-w-[80%] scroll-auto">
      <DialogHeader>
        <DialogTitle>بيانات التذكرة</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>
        <div className="flex gap-3">
          <Field>
            <Label>رقم التذكرة</Label>
            <Input disabled value={entity?.id} />
          </Field>

          <Field>
            <Label>رقم الكرسي</Label>
            <Input
              disabled
              value={(entity?.chairNo ?? -1) < 0 ? 0 : entity?.chairNo}
            />
          </Field>
        </div>

        <Field>
          <Label>الراكب</Label>
          <div className="flex w-full gap-2">
            <div className="flex-10">
              <Select
                dir="rtl"
                value={formData.passengerId?.toString() || ""}
                onValueChange={(val) => {
                  const selectedPassenger = passengers?.find(
                    (c) => c.id.toString() === val,
                  );
                  if (selectedPassenger) {
                    setFormData((prev) => ({
                      ...prev,
                      passengerId: selectedPassenger.id,
                      passenger: selectedPassenger,
                    }));
                    clearError("passengerId");
                  }
                }}
                disabled={fetchingCities}
              >
                <SelectTrigger
                  className={
                    errorInputClass(!!fieldErrors.passengerId) + " w-full"
                  }
                >
                  <SelectValue placeholder="اختر الراكب" />
                </SelectTrigger>
                <SelectContent>
                  {passengers?.map((passenger) => (
                    <SelectItem
                      key={passenger.id}
                      value={passenger.id.toString()}
                    >
                      {passenger.name} - {passenger.passportNo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="flex-1"
              onClick={() => onPassengerDialogClicked?.(undefined)}
            >
              إضافة
              <PlusCircle />
            </Button>

            {formData.passenger && (
              <Button
                variant="secondary"
                className="flex-1 bg"
                onClick={() => onPassengerDialogClicked?.(formData.passenger!)}
              >
                تعديل
                <Edit />
              </Button>
            )}
          </div>
        </Field>

        <div className="flex gap-3">
          <Field>
            <Label>من المدينة</Label>
            <Select
              dir="rtl"
              value={formData.fromCityId?.toString() || ""}
              onValueChange={(val) => {
                const selectedCity = cities.find(
                  (c) => c.id.toString() === val,
                );
                setFormData({
                  ...formData,
                  fromCityId: selectedCity?.id,
                  fromCityName: selectedCity?.name,
                });
                clearError("fromCityId");
              }}
              disabled={fetchingCities}
            >
              <SelectTrigger
                className={errorInputClass(!!fieldErrors.fromCityId)}
              >
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label>إلى المدينة</Label>
            <Select
              dir="rtl"
              value={formData.toCityId?.toString() || ""}
              onValueChange={(val) => {
                const selectedCity = cities.find(
                  (c) => c.id.toString() === val,
                );
                setFormData({
                  ...formData,
                  toCityId: selectedCity?.id,
                  toCityName: selectedCity?.name,
                });
                clearError("toCityId");
              }}
              disabled={fetchingCities}
            >
              <SelectTrigger
                className={errorInputClass(!!fieldErrors.toCityId)}
              >
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="flex gap-3">
          <Field>
            <Label>المبلغ</Label>
            <Input
              value={formData.amount || ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }));
                clearError("amount");
              }}
              className={errorInputClass(!!fieldErrors.amount)}
            />
          </Field>

          <Field>
            <Label>المبلغ المدفوع</Label>
            <Input
              value={formData.paidAmount || ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  paidAmount: Number(e.target.value),
                }));
                clearError("paidAmount");
              }}
              className={errorInputClass(!!fieldErrors.paidAmount)}
            />
          </Field>
        </div>

        <div className="flex gap-3">
          <Field>
            <Label>تاريخ الإصدار</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!formData?.issueDate}
                  className={`
                    w-53 justify-between text-left font-normal
                    data-[empty=true]:text-muted-foreground
                    ${errorInputClass(!!fieldErrors.issueDate)}
                  `}
                >
                  {formData?.issueDate ? (
                    format(formData?.issueDate, "PPP", { locale: arSA })
                  ) : (
                    <span>اختر تاريخا</span>
                  )}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  captionLayout="dropdown"
                  mode="single"
                  selected={formData?.issueDate}
                  onSelect={(date) => {
                    setFormData((prev) => ({ ...prev, issueDate: date }));
                    clearError("issueDate");
                  }}
                  defaultMonth={formData?.issueDate}
                  locale={arSADayPicker}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field>
            <Label>مكان الإصدار</Label>
            <Select
              dir="rtl"
              value={formData.issueCityId?.toString() || ""}
              onValueChange={(val) => {
                setFormData({ ...formData, issueCityId: Number(val) });
                clearError("issueCityId");
              }}
              disabled={fetchingCities}
            >
              <SelectTrigger
                className={errorInputClass(!!fieldErrors.issueCityId)}
              >
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field>
          <Label>الملاحظات</Label>
          <Input
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
        </Field>
      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>
        <Button onClick={onSaveHandler}>حفظ</Button>
      </DialogFooter>
    </DialogContent>
  );
}
