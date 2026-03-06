import SaveButton from "@/app/core/components/buttons/saveButton";
import type { CummonChangeDialogProps } from "@/app/core/components/dialogs/cummonChangeDialogProps";
import SearchableSelect from "@/app/core/components/select/searchableSelect";
import useEntities from "@/app/core/hooks/useEntities";
import {
  useFormValidation,
  type ValidationRule,
} from "@/app/core/hooks/useFormValidation";
import BranchesApiService from "@/app/core/networking/services/branchesApiService";
import RolesApiService from "@/app/core/networking/services/rolesApiService";
import UsersApiService from "@/app/core/networking/services/usersApiService";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { RoleFilterColumns } from "../../roles/data/role";
import type User from "../data/user";

export default function ChangeUserDialog({
  entity,
  mode,
  onSuccess,
}: CummonChangeDialogProps<User>) {
  const [formData, setFormData] = useState<Partial<User>>({
    id: entity?.id,
    username: entity?.username || "",
    password: "",
    isActive: entity?.isActive ?? true,
    roleId: entity?.roleId,
    branchId: entity?.branchId,
    role: entity?.role,
    branch: entity?.branch,
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
    {
      field: "roleId",
      selector: (d) => d.roleId,
      validators: [Validators.required("يرجى اختيار دور")],
    },
    {
      field: "branchId",
      selector: (d) => d.branchId,
      validators: [Validators.required("يرجى اختيار فرع للموظف")],
    },
  ];
  const { getError, isInvalid, validate, clearError, errorInputClass } =
    useFormValidation(formData, validationRules);

  const {
    entities: branches,
    filter: filterBranches,
    isLoading: fetchingBranches,
  } = useEntities(new BranchesApiService());
  const {
    entities: roles,
    filter: filterRoles,
    isLoading: fetchingRoles,
  } = useEntities(new RolesApiService());

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
            value={formData.password}
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
          <Label>الدور</Label>
          <SearchableSelect
            items={roles?.data ?? []}
            itemLabelKey="name"
            itemValueKey="id"
            placeholder="اختر الدور"
            value={formData.roleId?.toString() || ""}
            onValueChange={(val) => {
              const selectedRole = roles?.data?.find(
                (c) => c.id.toString() === val,
              );
              if (selectedRole) {
                setFormData((prev) => ({
                  ...prev,
                  roleId: selectedRole.id,
                  role: selectedRole,
                }));
                clearError("roleId");
              }
            }}
            columnsNames={RoleFilterColumns.columnsNames}
            onSearch={(condition) => filterRoles(condition)}
            errorInputClass={errorInputClass("roleId")}
            disabled={fetchingRoles}
          />
          {isInvalid("roleId") && (
            <span className="text-xs text-red-500">{getError("roleId")}</span>
          )}
        </Field>

        <Field>
          <Label>الفرع</Label>
          <SearchableSelect
            items={branches?.data ?? []}
            itemLabelKey="name"
            itemValueKey="id"
            placeholder="اختر الفرع"
            value={formData.branchId?.toString() || ""}
            onValueChange={(val) => {
              const selectedBranch = branches?.data?.find(
                (c) => c.id.toString() === val,
              );
              if (selectedBranch) {
                setFormData((prev) => ({
                  ...prev,
                  branchId: selectedBranch.id,
                  branch: selectedBranch,
                }));
                clearError("branchId");
              }
            }}
            columnsNames={RoleFilterColumns.columnsNames}
            onSearch={(condition) => filterBranches(condition)}
            errorInputClass={errorInputClass("branchId")}
            disabled={fetchingBranches}
          />
          {isInvalid("branchId") && (
            <span className="text-xs text-red-500">{getError("branchId")}</span>
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
          onSuccess={(data) => onSuccess?.(data, mode)}
          validation={validate}
        />
      </DialogFooter>
    </DialogContent>
  );
}
