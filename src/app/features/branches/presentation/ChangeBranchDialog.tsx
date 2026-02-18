import type { CummonChangeDialogProps } from "@/app/core/components/Dialogs/CummonChangeDialogProps";
import BranchesApiService from "@/app/core/Networking/Services/BranchesApiService";
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
import SaveButton from "../../../core/components/Buttons/SaveButton";
import useCities from "../../../core/Hooks/useCities";
import type Branch from "../data/Branch";

export default function ChangeBranchDialog({
  entity,
  mode,
  onSuccess,
}: CummonChangeDialogProps<Branch>) {
  const [formData, setFormData] = useState<Partial<Branch>>({
    id: entity?.id,
    name: entity?.name,
    cityId: entity?.cityId,
  });

  const { cities, fetchingCities } = useCities();

  return (
    <DialogContent dir="rtl" className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "إضافة" : "تعديل"} فرع</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator></Separator>

      <FieldGroup className="py-2">
        <Field>
          <Label htmlFor="branchId">رقم الفرع</Label>
          <Input
            id="branchId"
            name="branchId"
            disabled={true}
            value={formData.id || ""}
            defaultValue={entity?.id}
          />
        </Field>

        <Field>
          <Label htmlFor="branchName">اسم الفرع</Label>
          <Input
            id="branchName"
            name="branchName"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Field>

        <Field>
          <Label htmlFor="branchCity">المدينة</Label>
          <Select
            dir="rtl"
            value={formData.cityId?.toString()}
            onValueChange={(val) =>
              setFormData({ ...formData, cityId: Number(val) })
            }
            disabled={fetchingCities}
          >
            <SelectTrigger>
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
      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>
        <SaveButton
          formData={formData as Branch}
          dialogMode={mode}
          service={new BranchesApiService()}
          disable={() => fetchingCities}
          onSuccess={onSuccess}
        />
      </DialogFooter>
    </DialogContent>
  );
}
