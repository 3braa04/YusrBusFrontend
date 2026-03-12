import type { DialogMode } from "./dialogType";

export type CommonChangeDialogProps<T> = {
    entity?:T;
    mode:DialogMode;
    onSuccess?: (newData: T, mode:DialogMode) => void;
}