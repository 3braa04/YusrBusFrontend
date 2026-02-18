import type { DialogMode } from "./DialogType";

export type CummonChangeDialogProps<T> = {
    entity?:T;
    mode:DialogMode;
    onSuccess?: (newData: T) => void;
}