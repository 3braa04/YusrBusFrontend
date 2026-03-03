import type { DialogMode } from "./dialogType";

export type CummonChangeDialogProps<T> = {
    entity?:T;
    mode:DialogMode;
    onSuccess?: (newData: T, mode:DialogMode) => void;
}