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

export default function ChangeUserDialog({
  entityType,
  mode,
  onSuccess,
}: CummonChangeDialogProps<User>) {
  const [formData, setFormData] = useState<Partial<User>>({
    id:entityType?.id,
    username: entityType?.username,
    isActive: entityType?.isActive,
  });

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
          <Input disabled defaultValue={entityType?.id}/>
        </Field>

        <Field>
          <Label>اسم المستخدم</Label>
          <Input
            defaultValue={entityType?.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </Field>

        <Field>
          <Label>حالة المستخدم</Label>
          <Select
            dir="rtl"
            defaultValue={entityType?.isActive ? "نشط" : "غير نشط"}
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
          dialogType={mode}
          service={new UsersApiService()}
          onSuccess={onSuccess}
        />
      </DialogFooter>
    </DialogContent>
  );
}
