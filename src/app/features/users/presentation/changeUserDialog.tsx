import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import type User from "../Data/User";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CummonChangeDialogProps } from "@/app/core/components/Dialogs/CummonChangeDialogProps";
import UsersApiService from "@/app/core/Networking/Services/UsersApiService";
import SaveButton from "@/app/core/components/Buttons/SaveButton";
import { useState } from "react";
import { useFormValidation, type ValidationRule } from "@/app/core/Hooks/useFormValidation";
import { Validators } from "@/app/core/utils/Validators";

export default function ChangeUserDialog({
  entity,
  mode,
  onSuccess,
}: CummonChangeDialogProps<User>) {
  const [formData, setFormData] = useState<Partial<User>>({
    id: entity?.id,
    username: entity?.username || "",
    password: entity?.password || "",
    isActive: entity?.isActive ?? true,
    permissions: entity?.permissions || 0,
  });

  const validationRules: ValidationRule<Partial<User>>[] = [
    {
      field: "username",
      selector: (d) => d.username,
      validators: [Validators.required("يرجى اختيار اسم المستخدم")],
    },
    {
      field: "password",
      selector: (d) => d.password,
      validators: [Validators.required("يرجى اختيار كلمة مرور")],
    },
  ];
  const { getError, isInvalid, validate, clearError, errorInputClass } =
    useFormValidation(formData, validationRules);

  return (
    <DialogContent dir="rtl" className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>
          {mode === "create" ? "إضافة" : "تعديل"} مستخدم
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>
        <Field>
          <Label>رقم المستخدم</Label>
          <Input disabled value={formData.id?.toString() || ""} />
        </Field>

        <Field>
          <Label>اسم المستخدم</Label>
          <Input
            value={formData.username || ""}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              clearError("username");
            }}
            className={errorInputClass("username")}
          />
          {isInvalid("username") && (
            <span className="text-xs text-red-500">{getError("username")}</span>
          )}
        </Field>

        <Field>
          <Label>كلمة المرور</Label>
          <Input
            value={formData.password || ""}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              clearError("password");
            }}
            className={errorInputClass("password")}
          />
          {isInvalid("password") && (
            <span className="text-xs text-red-500">{getError("password")}</span>
          )}
        </Field>

        <Field>
          <Label>حالة المستخدم</Label>
          <Select
            dir="rtl"
            value={formData.isActive ? "نشط" : "غير نشط"}
            onValueChange={(val) =>
              setFormData({
                ...formData,
                isActive: val == "نشط" ? true : false,
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="نشط">نشط</SelectItem>
              <SelectItem value="غير نشط">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>

        <SaveButton
          formData={formData as User}
          dialogMode={mode}
          service={new UsersApiService()}
          onSuccess={onSuccess}
          validation={validate}
        />
      </DialogFooter>
    </DialogContent>
  );
}
