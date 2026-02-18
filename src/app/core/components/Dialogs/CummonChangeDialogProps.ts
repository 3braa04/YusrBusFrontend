import type { DialogType } from "./DialogType";

export type CummonChangeDialogProps<T> = {
    entityType?:T;
    mode:DialogType;
    onSuccess?: (newData: T) => void;
}