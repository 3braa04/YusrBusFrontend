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
import { useEffect, useState } from "react";
import { arSA as arSADayPicker } from "react-day-picker/locale";
import type { Passenger } from "../../Passengers/Data/Passenger";
import type { Ticket } from "../Data/Ticket";
import {
  useFormValidation,
  type ValidationRule,
} from "@/app/core/Hooks/useFormValidation";
import { Validators } from "@/app/core/utils/Validators";

type ChangeTicketDialogProps = {
  entity?: Ticket;
  passengers?: Passenger[];
  onPassengerDialogClicked?: (passenger?: Passenger) => void;
  onSuccess?: (newData: Ticket) => void;
};

export default function ChangeTicketDialog({
  entity,
  passengers,
  onPassengerDialogClicked,
  onSuccess,
}: ChangeTicketDialogProps) {
  const [formData, setFormData] = useState<Partial<Ticket>>(entity || {});
  const { cities, fetchingCities } = useCities();

  useEffect(() => {
    if (entity) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(entity);
    }
  }, [entity]);

  const validationRules: ValidationRule<Partial<Ticket>>[] = [
    {
      field: "passengerId",
      selector: (d) => d.passengerId,
      validators: [Validators.required("يرجى اختيار راكب")],
    },
    {
      field: "fromCityId",
      selector: (d) => d.fromCityId,
      validators: [Validators.required("يرجى اختيار مدينة المغادرة")],
    },
    {
      field: "toCityId",
      selector: (d) => d.toCityId,
      validators: [Validators.required("يرجى اختيار مدينة الوجهة")],
    },
    {
      field: "amount",
      selector: (d) => d.amount,
      validators: [Validators.min(0, "يرجى ادخال المبلغ المطلوب دفعه")],
    },
    {
      field: "paidAmount",
      selector: (d) => d.paidAmount,
      validators: [Validators.min(0, "يرجى ادخال المبلغ المدفوع")],
    },
    {
      field: "issueDate",
      selector: (d) => d.issueDate,
      validators: [Validators.required("يرجى ادخال تاريخ الاصدار")],
    },
    {
      field: "issueCityId",
      selector: (d) => d.issueCityId,
      validators: [Validators.required("يرجى اختيار مدينة الاصدار")],
    },
  ];

  const { getError, isInvalid, validate, clearError, errorInputClass } =
    useFormValidation(formData, validationRules);

  function onSaveHandler() {
    if (!validate()) return; // stop if invalid
    onSuccess?.(formData as Ticket);
  }

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
                  className={errorInputClass("passengerId") + " w-full"}
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
          {isInvalid("passengerId") && (
            <span className="text-xs text-red-500">
              {getError("passengerId")}
            </span>
          )}
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
              <SelectTrigger className={errorInputClass("fromCityId")}>
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
            {isInvalid("fromCityId") && (
              <span className="text-xs text-red-500">
                {getError("fromCityId")}
              </span>
            )}
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
              <SelectTrigger className={errorInputClass("toCityId")}>
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
              className={errorInputClass("amount")}
            />
            {isInvalid("amount") && (
              <span className="text-xs text-red-500">{getError("amount")}</span>
            )}
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
              className={errorInputClass("paidAmount")}
            />
          </Field>
          {isInvalid("paidAmount") && (
            <span className="text-xs text-red-500">
              {getError("paidAmount")}
            </span>
          )}
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
                    ${errorInputClass("issueDate")}
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
            {isInvalid("issueDate") && (
              <span className="text-xs text-red-500">
                {getError("issueDate")}
              </span>
            )}
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
              <SelectTrigger className={errorInputClass("issueCityId")}>
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
          {isInvalid("issueCityId") && (
            <span className="text-xs text-red-500">
              {getError("issueCityId")}
            </span>
          )}
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
