import SaveButton from "@/app/core/components/Buttons/SaveButton";
import type { CummonChangeDialogProps } from "@/app/core/components/Dialogs/CummonChangeDialogProps";
import useCities from "@/app/core/Hooks/useCities";
import RoutesApiService from "@/app/core/Networking/Services/RoutesApiService";
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
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Route, RouteStation } from "../Data/Route";

export default function ChangeRouteDialog({
  entity,
  mode,
  onSuccess,
}: CummonChangeDialogProps<Route>) {
  const [formData, setFormData] = useState<Partial<Route>>({
    routeStations: [],
  });

  useEffect(() => {
    if (mode === "update" && entity?.id) {
      const getRoute = async () => {
        const service = new RoutesApiService();
        const res = await service.Get(entity.id);

        setFormData({
          id: res.data?.id,
          name: res.data?.name,
          fromCityId: res.data?.fromCityId,
          toCityId: res.data?.toCityId,
          fromCityName: res.data?.fromCityName,
          toCityName: res.data?.toCityName,
          routeStations: res.data?.routeStations || [],
        });
      };

      getRoute();
    } else {
      // For create mode, ensure routeStations is at least an empty array
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, routeStations: [] }));
    }
  }, [entity?.id, mode]);

  const { cities, fetchingCities } = useCities();

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const clearError = (field: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validate = (): boolean => {
    const errors: Record<string, boolean> = {};

    // Route name
    if (!formData.name?.trim()) errors.name = true;

    // From city
    if (!formData.fromCityId) errors.fromCityId = true;

    // To city
    if (!formData.toCityId) errors.toCityId = true;

    // Stations
    const stations = formData.routeStations || [];
    if (stations.length === 0) {
      errors.stations = true;
    } else {
      // Check each station has city and period > 0
      const hasInvalidStation = stations.some(
        (station) => !station.cityId || (station.period ?? 0) <= 0
      );
      if (hasInvalidStation) errors.stations = true;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const errorInputClass = (hasError: boolean) =>
    hasError ? "border-red-500 ring-red-500" : "";

  const addStation = () => {
    const newStation = new RouteStation({
      index: (formData.routeStations?.length || 0) + 1,
      period: 0,
      cityName: "",
    });
    setFormData((prev) => ({
      ...prev,
      routeStations: [...(prev.routeStations || []), newStation],
    }));
    clearError("stations");
  };

  const removeStation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      routeStations:
        prev.routeStations
          ?.filter((_, i) => i !== index)
          .map((station, i) => ({ ...station, index: i + 1 })) || [],
    }));
    clearError("stations");
  };

  const updateStation = (
    index: number,
    field: keyof RouteStation,
    value: unknown
  ) => {
    setFormData((prev) => {
      const updatedStations = [...(prev.routeStations || [])];
      updatedStations[index] = {
        ...updatedStations[index],
        [field]: value,
      };
      return {
        ...prev,
        routeStations: updatedStations,
      };
    });
    clearError("stations");
  };

  return (
    <DialogContent dir="rtl" className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "إضافة" : "تعديل"} خط</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>
        <Field>
          <Label>رقم الخط</Label>
          <Input disabled value={entity?.id?.toString() || ""} />
        </Field>

        <Field>
          <Label>اسم الخط</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
              clearError("name");
            }}
            className={errorInputClass(!!fieldErrors.name)}
          />
        </Field>

        <div className="flex gap-3">
          <Field>
            <Label>من المدينة</Label>
            <Select
              dir="rtl"
              value={formData.fromCityId?.toString() || ""}
              onValueChange={(val) => {
                const selectedCity = cities.find(
                  (c) => c.id.toString() === val
                );
                if (selectedCity) {
                  setFormData((prev) => ({
                    ...prev,
                    fromCityId: selectedCity.id,
                    fromCityName: selectedCity.name,
                  }));
                  clearError("fromCityId");
                }
              }}
              disabled={fetchingCities}
            >
              <SelectTrigger
                className={errorInputClass(!!fieldErrors.fromCityId)}
              >
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

          <Field>
            <Label>إلى المدينة</Label>
            <Select
              dir="rtl"
              value={formData.toCityId?.toString() || ""}
              onValueChange={(val) => {
                const selectedCity = cities.find(
                  (c) => c.id.toString() === val
                );
                if (selectedCity) {
                  setFormData((prev) => ({
                    ...prev,
                    toCityId: selectedCity.id,
                    toCityName: selectedCity.name,
                  }));
                  clearError("toCityId");
                }
              }}
              disabled={fetchingCities}
            >
              <SelectTrigger className={errorInputClass(!!fieldErrors.toCityId)}>
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
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold">محطات الخط</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addStation}
            >
              <Plus className="h-4 w-4 ml-2" /> إضافة محطة
            </Button>
          </div>

          {/* Stations container with possible error border */}
          <div className={errorInputClass(!!fieldErrors.stations)}>
            {(formData.routeStations?.length ?? 0) > 0 && (
              <div className="flex gap-3 px-3 mb-1 text-muted-foreground text-xs font-medium">
                <div className="flex-1">المدينة</div>
                <div>مدة الوصول (دقيقة)</div>
                <div className="w-10">{/* Empty for trash icon */}</div>
              </div>
            )}

            {(formData.routeStations?.length ?? 0) === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6 border-2 border-dashed rounded-lg">
                لا توجد محطات مضافة لهذا الخط بعد.
              </p>
            ) : (
              <div className="space-y-2">
                {formData.routeStations?.map((station, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 border rounded-md hover:bg-secondary/5 transition-colors"
                  >
                    <Field className="flex-1 cursor-pointer">
                      <Select
                        dir="rtl"
                        value={station.cityId?.toString() || ""}
                        onValueChange={(val) => {
                          updateStation(index, "cityId", Number(val));
                          // Also update cityName for display
                          const city = cities.find((c) => c.id.toString() === val);
                          if (city) {
                            updateStation(index, "cityName", city.name);
                          }
                        }}
                        disabled={fetchingCities}
                      >
                        <SelectTrigger
                          // Optionally highlight if this station is invalid
                          className={
                            !station.cityId && fieldErrors.stations
                              ? "border-red-500 ring-red-500"
                              : ""
                          }
                        >
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

                    <Field className="w-24">
                      <Input
                        type="number"
                        value={station.period ?? ""}
                        onChange={(e) =>
                          updateStation(index, "period", parseInt(e.target.value) || 0)
                        }
                        className={
                          (station.period ?? 0) <= 0 && fieldErrors.stations
                            ? "border-red-500 ring-red-500"
                            : ""
                        }
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
          {fieldErrors.stations && (
            <p className="text-xs text-red-500 mt-1">
              يجب إضافة محطة واحدة على الأقل مع تحديد المدينة والمدة (أكبر من 0)
            </p>
          )}
        </div>
      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>
        <SaveButton
          formData={formData as Route}
          dialogMode={mode}
          service={new RoutesApiService()}
          disable={() => fetchingCities}
          onSuccess={onSuccess}
          validation={validate}
        />
      </DialogFooter>
    </DialogContent>
  );
}