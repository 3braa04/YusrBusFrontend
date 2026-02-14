import { useState } from "react";
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
import { Plus, Trash2 } from "lucide-react";
import { Route, RouteStation } from "../../Data/Route";

type BranchDialogType = "create" | "update";

export default function ChangeRouteDialog({ route, type }: { route: Route | undefined, type: BranchDialogType }) 
{
  const [stations, setStations] = useState<RouteStation[]>(route?.routeStations || []);

  const addStation = () => {
    const newStation = new RouteStation({
      index: stations.length,
      period: 0,
      cityName: "",
    });
    setStations([...stations, newStation]);
  };

  const removeStation = (index: number) => {
    setStations(stations.filter((_, i) => i !== index));
  };

  const updateStation = (index: number, field: keyof RouteStation, value: any) => {
    const updated = [...stations];
    updated[index] = { ...updated[index], [field]: value };
    setStations(updated);
  };

  return (
    <DialogContent dir="rtl" className="sm:max-w-xl">
      
      <DialogHeader>
        <DialogTitle>{type === 'create' ? 'إضافة' : 'تعديل'} خط</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>

        <Field>
          <Label>رقم الخط</Label>
          <Input disabled defaultValue={route?.id} />
        </Field>
        
        <Field>
          <Label>اسم الخط</Label>
          <Input defaultValue={route?.name} />
        </Field>

        <div className="flex gap-3">
          
          <Field>
            <Label>من المدينة</Label>
            <Select dir="rtl" defaultValue={route?.fromCityName}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="المدينة المنورة">المدينة المنورة</SelectItem>
                <SelectItem value="مكة">مكة</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label>إلى المدينة</Label>
            <Select dir="rtl" defaultValue={route?.toCityName}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="جدة">جدة</SelectItem>
                <SelectItem value="الرياض">الرياض</SelectItem>
              </SelectContent>
            </Select>
          </Field>

        </div>

        <Separator />

        <div className="space-y-3">
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold">محطات الخط</h3>
            <Button type="button" variant="outline" size="sm" onClick={addStation}>
              <Plus className="h-4 w-4 ml-2" /> إضافة محطة
            </Button>
          </div>

          {stations.length > 0 && (
            <div className="flex gap-3 px-3 mb-1 text-muted-foreground text-xs font-medium">
              <div className="flex-1">المدينة</div>
              <div>مدة الوصول (دقيقة)</div>
              <div className="w-10">{/* Empty for trash icon */}</div>
            </div>
          )}

          {stations.length === 0 ? 
          (
            <p className="text-xs text-muted-foreground text-center py-6 border-2 border-dashed rounded-lg">
              لا توجد محطات مضافة لهذا الخط بعد.
            </p>
          ) 
          : 
          (
            <div className="space-y-2">
              {stations.map((station, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded-md hover:bg-secondary/5 transition-colors">
                  
                  <Field className="flex-1 cursor-pointer">
                    <Select 
                      dir="rtl" 
                      value={station.cityName} 
                      onValueChange={(val) => updateStation(index, "cityName", val)}
                    >
                      <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="جدة">جدة</SelectItem>
                        <SelectItem value="مكة">مكة</SelectItem>
                        <SelectItem value="الرياض">الرياض</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field className="w-24">
                    <Input 
                      type="number" 
                      value={station.period} 
                      onChange={(e) => updateStation(index, "period", parseInt(e.target.value))}
                    />
                  </Field>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-10 text-destructive hover:bg-destructive/10" 
                    onClick={() => removeStation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>
              ))}
            </div>
          )}
        </div>

      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>
        <Button type="button" onClick={() => console.log("Saving:", stations)}>
          حفظ التغييرات
        </Button>
      </DialogFooter>

    </DialogContent>
  );
}