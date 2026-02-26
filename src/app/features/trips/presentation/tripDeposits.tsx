import { Button } from "@/components/ui/button";
import { Archive, ArrowLeft, Box, PackagePlus, X } from "lucide-react";
import type { Deposit } from "../data/deposit";
import { ScrollArea } from "@/components/ui/scroll-area";

type TripDepositsParams = {
  deposits: Deposit[];
  onDepositDeleted: (index: number) => void;
  onDepositDialogOpened: (deposit: Deposit | undefined) => void;
};

export default function TripDeposits({ deposits, onDepositDeleted, onDepositDialogOpened }: TripDepositsParams) {
  return (
    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b">
        <div className="flex items-center gap-2">
          <Archive className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold">
            ({deposits.length})
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onDepositDialogOpened(undefined)}
          className="h-7 px-2 text-[10px] gap-1"
        >
          <PackagePlus className="w-3.5 h-3.5" />
          إضافة
        </Button>
      </div>

      {/* Content Area */}
      <ScrollArea className="h-50">
        <div className="p-2 flex flex-col gap-2">
          {!deposits.length ? (
            <div className="flex flex-col items-center justify-center py-8 text-center opacity-50">
              <Box className="w-8 h-8 mb-1 stroke-1" />
              <p className="text-[10px]">لا توجد أمانات مضافة</p>
            </div>
          ) : (
            deposits.map((dep, i) => (
              <div dir="rtl"
                key={i}
                className="flex items-center gap-2 p-2 rounded-md border bg-background group transition-colors hover:bg-muted/30"
              >
                {dep.image?.url || dep.image?.base64File ? (
                  <img
                    alt="deposit"
                    src={dep.image.url || `data:${dep.image.contentType};base64,${dep.image.base64File}`}
                    className="w-9 h-9 rounded-sm object-cover border"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-sm bg-muted flex items-center justify-center">
                    <Box className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none truncate">
                    {dep.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1 min-w-0">
                    <span className="font-medium text-foreground/80">{dep.sender}</span>
                    <ArrowLeft className="h-3 w-3" />
                    <span className="font-medium text-foreground/80">{dep.recipient}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDepositDeleted(i)}
                  className="w-6 h-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}