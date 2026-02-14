import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { arSA as arSADayPicker } from "react-day-picker/locale";
import type { Passenger } from "../../Data/Passenger";

type BranchDialogType = "create" | "update";

export default function ChangePassengerDialog({ passenger, type }: { passenger: Passenger | undefined, type: BranchDialogType }) 
{
  return (
    <DialogContent dir="rtl" className="sm:max-w-xl">
      
      <DialogHeader>
        <DialogTitle>{type === 'create' ? 'إضافة' : 'تعديل'} الراكب</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>

        <Field>
          <Label>رقم الراكب</Label>
          <Input disabled defaultValue={passenger?.id} />
        </Field>
        
        <Field>
          <Label>اسم الراكب</Label>
          <Input defaultValue={passenger?.name} />
        </Field>

        <div className="flex gap-3">
          
          <Field>
            <Label>الجنس</Label>
            <Select dir="rtl" defaultValue={passenger?.phoneNumber}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ذكر">ذكر</SelectItem>
                <SelectItem value="أنثى">أنثى</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label>الجنسية</Label>
            <Select dir="rtl" defaultValue={passenger?.email}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="السعودية">السعودية</SelectItem>
              </SelectContent>
            </Select>
          </Field>

        </div>

        <div className="flex gap-3">
          
          <Field>
            <Label>رقم الجوال</Label>
            <Select dir="rtl" defaultValue={passenger?.phoneNumber}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="المدينة المنورة">المدينة المنورة</SelectItem>
                <SelectItem value="مكة">مكة</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label>البريد الإلكتروني</Label>
            <Select dir="rtl" defaultValue={passenger?.email}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="جدة">جدة</SelectItem>
                <SelectItem value="الرياض">الرياض</SelectItem>
              </SelectContent>
            </Select>
          </Field>

        </div>

        <Field>
          <Label>تاريخ الميلاد</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!passenger?.dateOfBirth}
                className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
              >
                {passenger?.dateOfBirth ? format(passenger?.dateOfBirth, "PPP", { locale: arSA }) : <span>إختر تاريخا</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                captionLayout="dropdown"
                mode="single"
                selected={passenger?.dateOfBirth}
                onSelect={() => {}}
                defaultMonth={passenger?.dateOfBirth}
                locale={arSADayPicker}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field>
          <Label>رقم الجواز</Label>
          <Input defaultValue={passenger?.passportNo} />
        </Field>

        <div className="flex gap-3">
          
          <Field>
            <Label>تاريخ انتهاء الجواز</Label>
            <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!passenger?.passportExpiration}
                className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
              >
                {passenger?.passportExpiration ? format(passenger?.passportExpiration, "PPP", { locale: arSA }) : <span>إختر تاريخا</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                captionLayout="dropdown"
                mode="single"
                selected={passenger?.passportExpiration}
                onSelect={() => {}}
                defaultMonth={passenger?.passportExpiration}
                locale={arSADayPicker}
              />
            </PopoverContent>
          </Popover>
          </Field>

          <Field>
            <Label>مكان إصدار الجواز</Label>
            <Select dir="rtl" defaultValue={passenger?.passportIssueLocation}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="جدة">جدة</SelectItem>
                <SelectItem value="الرياض">الرياض</SelectItem>
              </SelectContent>
            </Select>
          </Field>

        </div>

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