import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type BranchDTO from "../../data/branch_dto";

type BranchDialogType = "create" | "update";

export default function ChangeBranchDialog({ branch, type }: { branch: BranchDTO | undefined, type: BranchDialogType }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{type === 'create'? 'إضافة' : 'تعديل'} الفرع</DialogTitle>
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
            defaultValue={branch?.id} 
          />
        </Field>

        <Field>
          <Label htmlFor="branchName">اسم الفرع</Label>
          <Input 
            id="branchName" 
            name="branchName" 
            defaultValue={branch?.name} 
          />
        </Field>
        
        <Field>
          <Label htmlFor="branchCity">المدينة</Label>
          <Select dir="rtl" defaultValue={branch?.cityName}>
            <SelectTrigger>
              <SelectValue placeholder="اختر المدينة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="المدينة المنورة">المدينة المنورة</SelectItem>
              <SelectItem value="مكة">مكة</SelectItem>
              <SelectItem value="جدة">جدة</SelectItem>
              <SelectItem value="الرياض">الرياض</SelectItem>
            </SelectContent>
          </Select>
        </Field>

      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>
        <Button type="button">حفظ التغييرات</Button>
      </DialogFooter>
    </>
  );
}