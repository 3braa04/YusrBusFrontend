import SaveButton from "@/app/core/components/buttons/saveButton";
import type { CummonChangeDialogProps } from "@/app/core/components/dialogs/cummonChangeDialogProps";
import {
  useFormValidation,
  type ValidationRule,
} from "@/app/core/hooks/useFormValidation";
import RolesApiService from "@/app/core/networking/services/rolesApiService";
import { Validators } from "@/app/core/utils/validators";
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
import { useState } from "react";
import type { Role } from "../data/role";

export default function ChangeRoleDialog({
  entity,
  mode,
  onSuccess,
}: CummonChangeDialogProps<Role>) {
  const [formData, setFormData] = useState<Partial<Role>>({
    id: entity?.id,
    name: entity?.name || "",
    permissions: entity?.permissions || [],
  });

  const validationRules: ValidationRule<Partial<Role>>[] = [
    {
      field: "name",
      selector: (d) => d.name,
      validators: [Validators.required("يرجى اختيار اسم للدور")],
    },
  ];
  const { getError, isInvalid, validate, clearError, errorInputClass } =
    useFormValidation(formData, validationRules);
    
  return (
    <DialogContent dir="rtl" className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>
          {mode === "create" ? "إضافة" : "تعديل"} دور
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>
        <Field>
          <Label>رقم الدور</Label>
          <Input disabled value={formData.id?.toString() || ""} />
        </Field>

        <Field>
          <Label>اسم الدور</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              clearError("name");
            }}
            className={errorInputClass("name")}
          />
          {isInvalid("name") && (
            <span className="text-xs text-red-500">{getError("name")}</span>
          )}
        </Field>

      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>

        <SaveButton
          formData={formData as Role}
          dialogMode={mode}
          service={new RolesApiService()}
          onSuccess={onSuccess}
          validation={validate}
        />
      </DialogFooter>
    </DialogContent>
  );
}
