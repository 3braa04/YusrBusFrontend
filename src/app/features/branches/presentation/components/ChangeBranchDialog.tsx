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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type Branch from "../../data/Branch";
import { useState } from "react";
import BranchesApiService from "@/app/core/Networking/Services/BranchesApiService";
import { Loader2 } from "lucide-react";
import useCities from "../../Logic/useCities";

type BranchDialogType = "create" | "update";

interface Props {
  branch?: Branch;
  type: BranchDialogType;
  onSuccess?: (newData: Branch) => void;
}

export default function ChangeBranchDialog({ branch, type, onSuccess }: Props) 
{
  const {cities, fetchingCities} = useCities();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Branch>>({
    id: branch?.id,
    name: branch?.name,
    cityId: branch?.cityId,
  });
  





  async function Save() 
  {
    setLoading(true);
    const service = new BranchesApiService();
    
    const result = type === "create" 
      ? await service.Add(formData as Branch) 
      : await service.Update(formData as Branch);

    setLoading(false);

    if (result.status === 200 || result.status === 201) 
    {
      onSuccess?.(result.data as Branch);
    } 
  }

  return (
    <DialogContent dir="rtl" className="sm:max-w-sm">

      <DialogHeader>
        <DialogTitle>{type === 'create'? 'إضافة' : 'تعديل'} فرع</DialogTitle>
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
            defaultValue={branch?.id} 
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
          <Select dir="rtl" 
            value={formData.cityId?.toString()} 
            onValueChange={(val) => setFormData({ ...formData, cityId: Number(val) })}
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
        <Button disabled={loading || fetchingCities} onClick={Save}>
          {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          حفظ التغييرات
        </Button>
      </DialogFooter>
    
    </DialogContent>
  );
}