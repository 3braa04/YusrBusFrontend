import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

export default function TableHeader({ title, buttonTitle, createComp }: { title: string, buttonTitle: string, createComp: ReactNode }) 
{
  const [isDialogOpen, setOpenDialogState] = useState(false);

  return (
    <>
      <div className="flex justify-between mb-8 gap-3">
        <div>
          <h1>{title}</h1>
        </div>
        <Button variant="default" onClick={() => setOpenDialogState(true)}>
          <PlusIcon className="h-4 w-4" />
          {buttonTitle}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setOpenDialogState}>
        <form>
          <DialogContent dir="rtl" className="sm:max-w-sm">
            {createComp}
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
