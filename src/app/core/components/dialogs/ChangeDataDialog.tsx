import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import type { PropsWithChildren } from "react";
import { FieldGroup } from "@/components/ui/field";

type ChangeDataDialogProps = PropsWithChildren & {
  title: string;
  description?: string;
  onSaveHandler: () => void;
};

export default function ChangeDataDialog({
  children,
  title,
  description = "",
  onSaveHandler,
}: ChangeDataDialogProps) {
  return (
    <DialogContent dir="rtl" className="sm:max-w-[80%] scroll-auto">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <Separator />

      <FieldGroup>{children}</FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إلغاء</Button>
        </DialogClose>
        <Button onClick={onSaveHandler}>حفظ</Button>
      </DialogFooter>
    </DialogContent>
  );
}
