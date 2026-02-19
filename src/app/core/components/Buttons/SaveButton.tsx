import type { DialogMode } from "@/app/core/components/Dialogs/DialogType";
import type BaseApiService from "@/app/core/Networking/BaseApiService";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props<T> {
  formData: T;
  dialogMode: DialogMode;
  service: BaseApiService<T>;
  disable?: () => boolean;
  onSuccess?: (newData: T) => void;
  preSave?: () => boolean;
}

export default function SaveButton<T>({
  formData,
  dialogMode,
  service,
  disable,
  onSuccess,
  preSave = () => true,
}: Props<T>) {
  const [loading, setLoading] = useState(false);

  async function Save() {
    if (!preSave()) return;

    setLoading(true);

    const result =
      dialogMode === "create"
        ? await service.Add(formData)
        : await service.Update(formData);

    setLoading(false);

    if (result.status === 200) {
      onSuccess?.(result.data as T);
    }
  }

  return (
    <Button disabled={loading || disable?.()} onClick={Save}>
      {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      حفظ التغييرات
    </Button>
  );
}
