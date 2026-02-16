import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type User from "../Data/User";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type BranchDialogType = "create" | "update";

export default function ChangeUserDialog({ user, type }: { user: User | undefined, type: BranchDialogType }) 
{
  return (
    <DialogContent dir="rtl" className="sm:max-w-xl">
      
      <DialogHeader>
        <DialogTitle>{type === 'create' ? 'إضافة' : 'تعديل'} مستخدم</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>

        <Field>
          <Label>رقم المستخدم</Label>
          <Input disabled defaultValue={user?.id} />
        </Field>
        
        <Field>
          <Label>اسم المستخدم</Label>
          <Input defaultValue={user?.username} />
        </Field>

        <Field>
          <Label>حالة المستخدم</Label>
          <Select dir="rtl" defaultValue={user?.isActive? "نشط" : "غير نشط"}>
              <SelectTrigger><SelectValue /></SelectTrigger>
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
        <Button type="button">
          حفظ التغييرات
        </Button>
      </DialogFooter>

    </DialogContent>
  );
}