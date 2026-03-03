import { SystemPermissionsActions } from "@/app/core/auth/systemPermissionsActions";
import { SystemPermissionsResources } from "@/app/core/auth/systemPermissionsResources";
import SaveButton from "@/app/core/components/buttons/saveButton";
import type { CummonChangeDialogProps } from "@/app/core/components/dialogs/cummonChangeDialogProps";
import { useFormValidation } from "@/app/core/hooks/useFormValidation";
import RolesApiService from "@/app/core/networking/services/rolesApiService";
import SystemApiService from "@/app/core/networking/services/systemApiService";
import { Validators } from "@/app/core/utils/validators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Database, FileBarChart, LayoutDashboard, Loader2, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Role } from "../data/role";

const ArabicLabels: Record<string, string> = {
  [SystemPermissionsResources.Branches]: "الفروع",
  [SystemPermissionsResources.Passengers]: "المسافرين",
  [SystemPermissionsResources.Routes]: "الخطوط",
  [SystemPermissionsResources.Settings]: "الإعدادات",
  [SystemPermissionsResources.Trips]: "الرحلات",
  [SystemPermissionsResources.Users]: "المستخدمين",
  [SystemPermissionsResources.Roles]: "الأدوار",
  [SystemPermissionsResources.Dashboard]: "لوحة التحكم",
  [SystemPermissionsResources.TicketReport]: "تقارير التذاكر",
  [SystemPermissionsResources.DepositReport]: "تقارير الأمانات",
  [SystemPermissionsResources.TripTicketsReport]: "تقارير تذاكر الرحلة",
  [SystemPermissionsResources.TripDepositsReport]: "تقارير إيداعات الرحلة",
  [SystemPermissionsActions.Add]: "إضافة",
  [SystemPermissionsActions.Update]: "تعديل",
  [SystemPermissionsActions.Delete]: "حذف",
};

const ActionIcons: Record<string, any> = {
  [SystemPermissionsActions.Add]: <Plus className="w-4 h-4 text-blue-500" />,
  [SystemPermissionsActions.Update]: <Pencil className="w-4 h-4 text-orange-500" />,
  [SystemPermissionsActions.Delete]: <Trash2 className="w-4 h-4 text-red-500" />,
};

export default function ChangeRoleDialog({ entity, mode, onSuccess }: CummonChangeDialogProps<Role>) 
{
  const [formData, setFormData] = useState<Partial<Role>>({
    id: entity?.id,
    name: entity?.name || "",
    permissions: Array.from(new Set([...(entity?.permissions || [])])),
  });

  const [systemPermissions, setSystemPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPerms = async () => {
      setIsLoading(true);
      try {
        const res = await new SystemApiService().GetSystemPermissions();
        setSystemPermissions(res.data ?? []);
      } finally {
        setIsLoading(false);
      }
    };
    getPerms();
  }, []);

  const categorizedPermissions = useMemo(() => {
    const groups = systemPermissions.reduce((acc, perm) => {
      const [resource, action] = perm.split(":");
      if (!acc[resource]) acc[resource] = { get: null, actions: [] };
      if (action === "Get") acc[resource].get = perm;
      else acc[resource].actions.push(perm);
      return acc;
    }, {} as Record<string, { get: string | null, actions: string[] }>);

    const tableOrder = [
        SystemPermissionsResources.Trips, 
        SystemPermissionsResources.Passengers, 
        SystemPermissionsResources.Routes, 
        SystemPermissionsResources.Branches, 
        SystemPermissionsResources.Roles, 
        SystemPermissionsResources.Users
    ];
    
    const systemOrder = [
        SystemPermissionsResources.Settings, 
        SystemPermissionsResources.Dashboard
    ];
    
    const reportOrder = [
        SystemPermissionsResources.TicketReport, 
        SystemPermissionsResources.DepositReport, 
        SystemPermissionsResources.TripTicketsReport, 
        SystemPermissionsResources.TripDepositsReport
    ];

    return {
      tables: tableOrder.filter(key => groups[key]).map(key => ({ resource: key, ...groups[key] })),
      system: systemOrder.filter(key => groups[key]).map(key => ({ resource: key, ...groups[key] })),
      reports: reportOrder.filter(key => groups[key]).map(key => ({ resource: key, ...groups[key] })),
    };
  }, [systemPermissions]);

  const toggleGetPermission = (resource: string, getPerm: string) => {
    const current = formData.permissions || [];
    const isActive = current.includes(getPerm);
    const updated = isActive 
      ? current.filter(p => !p.startsWith(`${resource}:`)) 
      : [...current, getPerm];
    setFormData({ ...formData, permissions: updated });
  };

  const toggleAction = (perm: string) => {
    const current = formData.permissions || [];
    const updated = current.includes(perm) 
      ? current.filter(p => p !== perm) 
      : [...current, perm];
    setFormData({ ...formData, permissions: updated });
  };

  const { getError, isInvalid, validate, clearError, errorInputClass } = useFormValidation(formData, [
    { field: "name", selector: (d) => d.name, validators: [Validators.required("يرجى اختيار اسم للدور")] }
  ]);

  const renderCard = (resource: string, data: { get: string | null, actions: string[] }) => {
    const hasGet = resource === SystemPermissionsResources.Settings? true : data.get ? formData.permissions?.includes(data.get) : false;

    return (
      <Card key={resource} className="shadow-none border-2">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">{ArabicLabels[resource] || resource}</span>
          </div>
          {data.get && (
            <Checkbox 
              checked={hasGet} 
              onCheckedChange={() => toggleGetPermission(resource, data.get!)}
            />
          )}
        </CardHeader>
        <CardContent className="p-2 space-y-1">
          {data.actions.map(perm => {
            const action = perm.split(":")[1];
            return (
              <div key={perm} className={`flex items-center justify-between p-2 rounded-sm transition-opacity ${!hasGet ? 'opacity-40 select-none' : 'hover:bg-muted'}`}>
                <div className="flex items-center gap-3">
                  {ActionIcons[action]}
                  <Label className="text-xs cursor-pointer">{ArabicLabels[action] || action}</Label>
                </div>
                <Checkbox 
                  disabled={!hasGet}
                  checked={formData.permissions?.includes(perm)}
                  onCheckedChange={() => toggleAction(perm)}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="shadow-none border-2">
          <CardHeader className="flex flex-row items-center justify-between border-b p-4">
            <Skeleton className="h-4 w-25" />
            <Skeleton className="h-5 w-5 rounded-md" />
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <DialogContent aria-describedby={undefined} dir="rtl" className="sm:max-w-6xl max-h-[90vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "إضافة" : "تعديل"} دور</DialogTitle>
        {isLoading && <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin text-muted-foreground" />}
      </DialogHeader>

      <Separator />

      <div className="flex-1 overflow-y-auto py-4 px-1">
        <FieldGroup className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field><Label>رقم الدور</Label><Input disabled value={formData.id?.toString() || "تلقائي"} /></Field>
            <Field>
              <Label>اسم الدور</Label>
              <Input value={formData.name || ""} className={errorInputClass("name")} onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError("name"); }} />
              {isInvalid("name") && <span className="text-xs text-red-500">{getError("name")}</span>}
            </Field>
          </div>
          
          {isLoading ? (
            <div className="space-y-8">
               <section className="space-y-4">
                  <Skeleton className="h-6 w-40" />
                  {renderSkeleton()}
               </section>
            </div>
          ) 
          : 
          (
            <>
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold"><Database className="w-5 h-5"/> <span>بيانات النظام الأساسية</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorizedPermissions.tables.map(item => renderCard(item.resource, item))}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold"><LayoutDashboard className="w-5 h-5"/> <span>الإعدادات والتحكم</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorizedPermissions.system.map(item => renderCard(item.resource, item))}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold"><FileBarChart className="w-5 h-5"/> <span>تقارير النظام</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorizedPermissions.reports.map(item => renderCard(item.resource, item))}
                </div>
              </section>
            </>
          )}
        </FieldGroup>
      </div>

      <DialogFooter className="gap-2">
        <DialogClose asChild><Button variant="outline">إلغاء</Button></DialogClose>
        <SaveButton formData={formData as Role} dialogMode={mode} service={new RolesApiService()} onSuccess={onSuccess} validation={validate} />
      </DialogFooter>
    </DialogContent>
  );
}