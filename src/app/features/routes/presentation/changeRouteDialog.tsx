import SaveButton from "@/app/core/components/buttons/saveButton";
import type { CummonChangeDialogProps } from "@/app/core/components/dialogs/cummonChangeDialogProps";
import Loading from "@/app/core/components/loading/loading";
import SearchableSelect from "@/app/core/components/select/searchableSelect";
import { CityFilterColumns } from "@/app/core/data/city";
import useCities from "@/app/core/hooks/useCities";
import {
  useFormValidation,
  type ValidationRule,
} from "@/app/core/hooks/useFormValidation";
import RoutesApiService from "@/app/core/networking/services/routesApiService";
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
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Route, RouteStation } from "../data/route";

export default function ChangeRouteDialog({
  entity,
  mode,
  onSuccess,
}: CummonChangeDialogProps<Route>) {
  const [formData, setFormData] = useState<Partial<Route>>({
    routeStations: [],
  });

  const [initLoading, setInitLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && entity?.id) {

      setInitLoading(true);

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

        setInitLoading(false);
      };

      getRoute();
    } else {
       
      setFormData((prev) => ({ ...prev, routeStations: [] }));
    }
  }, [entity?.id, mode]);

  const { cities, fetchingCities, filterCities } = useCities();

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
    value: unknown,
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
    clearError(field);
  };

  const validationRules: ValidationRule<Partial<Route>>[] = [
    {
      field: "name",
      selector: (d) => d.name,
      validators: [Validators.required("يرجى إدخال اسم الخط")],
    },
    {
      field: "fromCityId",
      selector: (d) => d.fromCityId,
      validators: [Validators.required("يرجى اختيار مدينة الانطلاق")],
    },
    {
      field: "toCityId",
      selector: (d) => d.toCityId,
      validators: [Validators.required("يرجى اختيار مدينة الوصول")],
    },
    {
      field: "stations",
      selector: (d) => d.routeStations,
      validators: [
        Validators.custom<RouteStation[]>((stations) => {
          return stations.every((s) => s.cityId && (s.period ?? 0) > 0);
        }, "يجب تحديد المدينة والمدة (أكبر من 0) لجميع المحطات"),
      ],
    },
  ];

  const { getError, isInvalid, validate, clearError, errorInputClass } = useFormValidation(
    formData,
    validationRules,
  );

  if (initLoading) {
    return (
      <DialogContent dir="rtl" >
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "إضافة" : "تعديل"} خط</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Loading entityName="الخط"/>
      </DialogContent>
    );
  }

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
            className={errorInputClass("name")}
          />
          {isInvalid("name") && (
            <span className="text-xs text-red-500">{getError("name")}</span>
          )}
        </Field>

        <div className="flex gap-3">
          <Field>
            <Label>من المدينة</Label>
            <SearchableSelect 
              items={cities} 
              itemLabelKey="name" 
              itemValueKey="id" 
              placeholder="اختر المدينة"
              value={formData.fromCityId?.toString() || ""} 
              onValueChange={(val) => {
                const selectedCity = cities.find((c) => c.id.toString() === val);
                if (selectedCity) {
                  setFormData((prev) => ({
                    ...prev,
                    fromCityId: selectedCity.id,
                    fromCityName: selectedCity.name,
                  }));
                  clearError("fromCityId");
                }
              }}
              columnsNames={CityFilterColumns.columnsNames}
              onSearch={(condition) => filterCities(condition)} 
              errorInputClass={errorInputClass("fromCityId")}
              disabled={fetchingCities}
            />
            {isInvalid("fromCityId") && (
              <span className="text-xs text-red-500">
                {getError("fromCityId")}
              </span>
            )}
          </Field>

          <Field>
            <Label>إلى المدينة</Label>
            <SearchableSelect 
              items={cities} 
              itemLabelKey="name" 
              itemValueKey="id" 
              placeholder="اختر المدينة"
              value={formData.toCityId?.toString() || ""} 
              onValueChange={(val) => {
                const selectedCity = cities.find((c) => c.id.toString() === val);
                if (selectedCity) {
                  setFormData((prev) => ({
                    ...prev,
                    toCityId: selectedCity.id,
                    toCityName: selectedCity.name,
                  }));
                  clearError("toCityId");
                }
              }}
              columnsNames={CityFilterColumns.columnsNames}
              onSearch={(condition) => filterCities(condition)} 
              errorInputClass={errorInputClass("toCityId")}
              disabled={fetchingCities}
            />
            {isInvalid("toCityId") && <span className="text-xs text-red-500">{getError("toCityId")}</span>}
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

          <div className={isInvalid("stations") ? "border border-red-600 rounded-md p-2" : ""}>
            {(formData.routeStations?.length ?? 0) > 0 && (
              <div className="flex gap-3 px-3 mb-1 text-muted-foreground text-xs font-medium">
                <div className="flex-1">المدينة</div>
                <div>مدة الوصول (ساعة)</div>
                <div className="w-10">{/* Empty for trash icon */}</div>
              </div>
            )}

            {(formData.routeStations?.length ?? 0) === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6 border-2 border-dashed rounded-lg">
                لا توجد محطات مضافة لهذا الخط بعد.
              </p>
            ) : (
              <div className="space-y-2">
                {formData.routeStations?.map((station, index) => {
                  const hasGlobalError = isInvalid("stations");
                  const isCityMissing = !station.cityId;
                  const isPeriodInvalid = (station.period ?? 0) <= 0;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 border rounded-md hover:bg-secondary/5 transition-colors"
                    >
                      <Field className="flex-1 cursor-pointer">
                        <SearchableSelect 
                          items={cities} 
                          itemLabelKey="name" 
                          itemValueKey="id" 
                          placeholder="اختر المدينة"
                          value={station.cityId?.toString() || ""} 
                          onValueChange={(val) => {
                            updateStation(index, "cityId", Number(val));
                            const city = cities.find((c) => c.id.toString() === val);
                            if (city) {
                              updateStation(index, "cityName", city.name);
                            }
                            if (hasGlobalError) 
                              clearError("stations");
                          }}
                          columnsNames={CityFilterColumns.columnsNames}
                          onSearch={(condition) => filterCities(condition)} 
                          errorInputClass={hasGlobalError && isCityMissing
                                ? "border-red-500 ring-red-500 text-red-900"
                                : ""}
                          disabled={fetchingCities}
                        />
                      </Field>

                      <Field className="w-24">
                        <Input
                          type="number"
                          step="0.1"
                          value={station.period ?? ""}
                          onChange={(e) => {
                            updateStation(
                              index,
                              "period",
                              parseFloat(e.target.value) || 0
                            );
                            if (hasGlobalError) 
                              clearError("stations");
                          }}
                          className={
                            hasGlobalError && isPeriodInvalid
                              ? "border-red-500 ring-red-500 text-red-900"
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
                  );
                })}

              </div>
            )}
          </div>
          {isInvalid("stations") && <p className="text-xs text-red-500 font-bold mt-2">{getError("stations")}</p>}
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
