import SearchableSelect from "@/app/core/components/select/searchableSelect";
import { CityFilterColumns } from "@/app/core/data/city";
import useCities from "@/app/core/hooks/useCities";
import {
  useFormValidation,
  type ValidationRule,
} from "@/app/core/hooks/useFormValidation";
import { Validators } from "@/app/core/utils/validators"; // تم تصغير v في validators
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
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { ChevronDownIcon, Edit, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { arSA as arSADayPicker } from "react-day-picker/locale";
import { PassengerFilterColumns, type Passenger } from "../../passengers/data/passenger";
import type { Ticket } from "../data/ticket";
import type { FilterCondition } from "@/app/core/data/filterCondition";

type ChangeTicketDialogProps = {
  entity?: Ticket;
  passengers?: Passenger[];
  filterPassengers: (condition?: FilterCondition | undefined) => Promise<void>;
  fetchingPassengers: boolean;
  onPassengerDialogClicked?: (passenger?: Passenger) => void;
  onSuccess?: (newData: Ticket) => void;
};

export default function ChangeTicketDialog({
  entity,
  passengers,
  filterPassengers,
  onPassengerDialogClicked,
  fetchingPassengers,
  onSuccess,
}: ChangeTicketDialogProps) {
  const [formData, setFormData] = useState<Partial<Ticket>>(entity || {});
  const { cities, fetchingCities, filterCities } = useCities();

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

  const passengerItems = passengers?.map((p) => ({
    ...p,
    displayLabel: `${p.name} - ${p.passportNo}`, 
  })) || [];

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
              <SearchableSelect 
                items={passengerItems} 
                itemLabelKey="displayLabel" 
                itemValueKey="id" 
                placeholder="اختر الراكب"
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
                columnsNames={PassengerFilterColumns.columnsNames}
                onSearch={(condition) => filterPassengers(condition)} 
                errorInputClass={errorInputClass("passengerId")}
                disabled={fetchingPassengers}
              />             
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
            <SearchableSelect 
              items={cities} 
              itemLabelKey="name" 
              itemValueKey="id" 
              placeholder="اختر المدينة"
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
              columnsNames={CityFilterColumns.columnsNames}
              onSearch={(condition) => filterCities(condition)} 
              errorInputClass={errorInputClass("fromCityId")}
              disabled={fetchingCities}
            />
            {isInvalid("fromCityId") && (
              <span className="text-xs text-red-500">
                {getError("fromCityId")}
              </span>
            )}
          </Field>

          <Field>
            <Label>إلى المدينة</Label>
            <SearchableSelect 
              items={cities} 
              itemLabelKey="name" 
              itemValueKey="id" 
              placeholder="اختر المدينة"
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
              columnsNames={CityFilterColumns.columnsNames}
              onSearch={(condition) => filterCities(condition)} 
              errorInputClass={errorInputClass("toCityId")}
              disabled={fetchingCities}
            />
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
              }}
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
            <SearchableSelect 
              items={cities} 
              itemLabelKey="name" 
              itemValueKey="id" 
              placeholder="اختر المدينة"
              value={formData.issueCityId?.toString() || ""}
              onValueChange={(val) => {
                setFormData({ ...formData, issueCityId: Number(val) });
                clearError("issueCityId");
              }}
              columnsNames={CityFilterColumns.columnsNames}
              onSearch={(condition) => filterCities(condition)} 
              errorInputClass={errorInputClass("issueCityId")}
              disabled={fetchingCities}
            />
            {isInvalid("issueCityId") && (
            <span className="text-xs text-red-500">
              {getError("issueCityId")}
            </span>
          )}
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
