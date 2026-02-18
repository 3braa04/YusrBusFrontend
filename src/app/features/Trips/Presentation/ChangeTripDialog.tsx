import SaveButton from "@/app/core/components/Buttons/SaveButton";
import type { CummonChangeDialogProps } from "@/app/core/components/Dialogs/CummonChangeDialogProps";
import useRoutes from "@/app/core/Hooks/useRoutes";
import TripsApiService from "@/app/core/Networking/Services/TripsApiService";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { arSA as arSADayPicker } from "react-day-picker/locale";
import type { Trip } from "../Data/Trip";

export default function ChangeTripDialog({ entity, mode, onSuccess }: CummonChangeDialogProps<Trip>) {
  const [formData, setFormData] = useState<Partial<Trip>>({});

  const {routes, fetchingRoutes} = useRoutes();

  useEffect(() => {
    if (mode === "update" && entity?.id) 
    {
      const getTrip = async () => {
        const service = new TripsApiService();
        const res = await service.Get(entity.id);

        setFormData({
          id: res.data?.id,
          mainCaptainName: res.data?.mainCaptainName,
          secondaryCaptainName: res.data?.secondaryCaptainName,
          busName: res.data?.busName,
          routeId: res.data?.routeId,
          startDate: res.data?.startDate,
          route: res.data?.route,
          tickets: res.data?.tickets,
        });
      };

      getTrip();
    }
  }, [entity?.id]); // Only runs when the route ID changes (opening a different route)

  return (
    <DialogContent dir="rtl" className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "إضافة" : "تعديل"} رحلة</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>
        <Field>
          <Label>رقم الرحلة</Label>
          <Input disabled value={entity?.id} />
        </Field>

        <div className="flex gap-3">
          <Field>
            <Label>اسم قائد الحافلة</Label>
            <Input
              value={formData.mainCaptainName || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, mainCaptainName: e.target.value }))
              }
            />
          </Field>

          <Field>
            <Label>اسم مساعد قائد الحافلة</Label>
            <Input
              value={formData.mainCaptainName || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, mainCaptainName: e.target.value }))
              }
            />
          </Field>

          <Field>
            <Label>الحافلة</Label>
            <Input
              value={formData.busName || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, busName: e.target.value }))
              }
            />
          </Field>
        </div>
          
        <Field>
          <Label>الخط</Label>
          <Select
              dir="rtl"
              value={formData.routeId?.toString() || ""}
              onValueChange={(val) => {
                const selectedCountry = routes.find(
                  (c) => c.id.toString() === val,
                );
                if (selectedCountry) {
                  setFormData((prev) => ({
                    ...prev,
                    routeId: selectedCountry.id,
                    route: selectedCountry,
                  }));
                }
              }}
              disabled={fetchingRoutes}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر خطًا" />
              </SelectTrigger>
              <SelectContent>
                {routes.map((route) => (
                  <SelectItem key={route.id} value={route.id.toString()}>
                    {route.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </Field>
        
        <Field>
          <Label>تاريخ الرحلة</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!formData?.startDate}
                className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
              >
                {formData?.startDate ? (
                  format(formData?.startDate, "PPP", { locale: arSA })
                ) : (
                  <span>إختر تاريخا</span>
                )}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                captionLayout="dropdown"
                mode="single"
                selected={formData?.startDate}
                onSelect={(date) => 
                  setFormData((prev) => ({ ...prev, startDate: date }))
                }
                defaultMonth={formData?.startDate}
                locale={arSADayPicker}
              />
            </PopoverContent>
          </Popover>
        </Field>

      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>
        <SaveButton
          formData={formData as Trip}
          dialogMode={mode}
          service={new TripsApiService()}
          onSuccess={onSuccess}
        />
      </DialogFooter>
    </DialogContent>
  );
}
