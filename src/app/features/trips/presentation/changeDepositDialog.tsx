import ChangeDataDialog from "@/app/core/components/dialogs/ChangeDataDialog";
import SearchableSelect from "@/app/core/components/select/searchableSelect";
import { CityFilterColumns } from "@/app/core/data/city";
import { StorageFile, StorageFileStatus } from "@/app/core/data/storageFile";
import useCities from "@/app/core/hooks/useCities";
import {
  useFormValidation,
  type ValidationRule,
} from "@/app/core/hooks/useFormValidation";
import { Validators } from "@/app/core/utils/validators";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { Deposit } from "../data/deposit";

type ChangeDepositDialogProps = {
  entity?: Deposit;
  onSuccess?: (newData: Deposit) => void;
};

export default function ChangeDepositDialog({
  entity,
  onSuccess,
}: ChangeDepositDialogProps) {
  const [formData, setFormData] = useState<Partial<Deposit>>(entity || {});
  const { cities, fetchingCities, filterCities } = useCities();

  useEffect(() => {
    if (entity) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(entity);
    }
  }, [entity]);

  const validationRules: ValidationRule<Partial<Deposit>>[] = [
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
      field: "sender",
      selector: (d) => d.sender,
      validators: [Validators.required("يرجى إدخال اسم المرسل")],
    },
    {
      field: "recipient",
      selector: (d) => d.recipient,
      validators: [Validators.required("يرجى إدخال اسم المستلم")],
    },
    {
      field: "senderPhone",
      selector: (d) => d.senderPhone,
      validators: [Validators.required("يرجى إدخال رقم هاتف المرسل")],
    },
    {
      field: "recipientPhone",
      selector: (d) => d.recipientPhone,
      validators: [Validators.required("يرجى إدخال رقم هاتف المستلم")],
    },
    {
      field: "description",
      selector: (d) => d.description,
      validators: [Validators.required("يرجى إدخال وصف الأمانة")],
    },
    {
      field: "amount",
      selector: (d) => d.amount,
      validators: [Validators.min(0, "يرجى إدخال المبلغ المطلوب")],
    },
  ];

  const { getError, isInvalid, validate, clearError, errorInputClass } =
    useFormValidation(formData, validationRules);

  function onSaveHandler() {
    if (!validate()) return;
    onSuccess?.(formData as Deposit);
  }

  return (
    <ChangeDataDialog title="بيانات الأمانة" onSaveHandler={onSaveHandler}>
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
              const selectedCity = cities.find((c) => c.id.toString() === val);
              setFormData((prev) => ({
                ...prev,
                fromCityId: selectedCity?.id,
                fromCityName: selectedCity?.name,
              }));
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
              const selectedCity = cities.find((c) => c.id.toString() === val);
              setFormData((prev) => ({
                ...prev,
                toCityId: selectedCity?.id,
                toCityName: selectedCity?.name,
              }));
              clearError("toCityId");
            }}
            columnsNames={CityFilterColumns.columnsNames}
            onSearch={(condition) => filterCities(condition)}
            errorInputClass={errorInputClass("toCityId")}
            disabled={fetchingCities}
          />
          {isInvalid("toCityId") && (
            <span className="text-xs text-red-500">{getError("toCityId")}</span>
          )}
        </Field>
      </div>

      <div className="flex gap-3">
        <Field>
          <Label>اسم المرسل</Label>
          <Input
            value={formData.sender || ""}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, sender: e.target.value }));
              clearError("sender");
            }}
            className={errorInputClass("sender")}
          />
          {isInvalid("sender") && (
            <span className="text-xs text-red-500">{getError("sender")}</span>
          )}
        </Field>

        <Field>
          <Label>رقم هاتف المرسل</Label>
          <Input
            value={formData.senderPhone || ""}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, senderPhone: e.target.value }));
              clearError("senderPhone");
            }}
            className={errorInputClass("senderPhone")}
          />
          {isInvalid("senderPhone") && (
            <span className="text-xs text-red-500">
              {getError("senderPhone")}
            </span>
          )}
        </Field>
      </div>

      <div className="flex gap-3">
        <Field>
          <Label>اسم المستلم</Label>
          <Input
            value={formData.recipient || ""}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, recipient: e.target.value }));
              clearError("recipient");
            }}
            className={errorInputClass("recipient")}
          />
          {isInvalid("recipient") && (
            <span className="text-xs text-red-500">
              {getError("recipient")}
            </span>
          )}
        </Field>

        <Field>
          <Label>رقم هاتف المستلم</Label>
          <Input
            value={formData.recipientPhone || ""}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                recipientPhone: e.target.value,
              }));
              clearError("recipientPhone");
            }}
            className={errorInputClass("recipientPhone")}
          />
          {isInvalid("recipientPhone") && (
            <span className="text-xs text-red-500">
              {getError("recipientPhone")}
            </span>
          )}
        </Field>
      </div>

      <Field>
        <Label>وصف الأمانة</Label>
        <Input
          value={formData.description || ""}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, description: e.target.value }));
            clearError("description");
          }}
          className={errorInputClass("description")}
        />
        {isInvalid("description") && (
          <span className="text-xs text-red-500">
            {getError("description")}
          </span>
        )}
      </Field>

      <div className="flex gap-3">
        <Field>
          <Label>المبلغ</Label>
          <Input
            type="number"
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
            type="number"
            value={formData.paidAmount || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                paidAmount: Number(e.target.value),
              }))
            }
          />
        </Field>
      </div>

      <Field>
        <Label>صورة الأمانة</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = (reader.result as string).split(",")[1];
              setFormData((prev) => ({
                ...prev,
                image: new StorageFile({
                  base64File: base64,
                  extension: file.name.split(".").pop() ?? null,
                  contentType: file.type,
                  status: StorageFileStatus.New,
                }),
              }));
            };
            reader.readAsDataURL(file);
          }}
        />
      </Field>

      <Field>
        <Label>الملاحظات</Label>
        <Input
          value={formData.notes || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
      </Field>
    </ChangeDataDialog>
  );
}
