import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { OctagonAlert } from "lucide-react";

export default function DeleteBranchDialog() {
  return (
    <>
        <DialogHeader>
            <DialogTitle>حذف الفرع</DialogTitle>
            <DialogDescription></DialogDescription>
        </DialogHeader>

        <Separator></Separator>

        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <OctagonAlert className="h-7 w-7 text-destructive" />
        </div>
           
        <span className="font-bold text-center text-xl">
            هل أنت متأكد؟          
        </span>

        <span className="text-center text-[15px]">
        لا يمكن التراجع عن هذا الإجراء. سيؤدي ذلك إلى حذف الفرع نهائياً
        وإزالته من خوادمنا.
        </span>

        <DialogFooter>
            <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button type="button" className="bg-destructive">حذف</Button>
        </DialogFooter>

    </>
  );
}