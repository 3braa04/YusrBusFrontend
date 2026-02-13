import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchInput() {
    return       <div className="p-4 rounded-t-xl border-x border-t flex flex-col justify-between sm:flex-row gap-4 ">
        <div className="relative w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="ابحث عن فرع أو مدينة..." 
            className="pr-10 bg-secondary border-none focus-visible:ring-1"
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm">تصفية</Button>
        </div>
      </div>
}