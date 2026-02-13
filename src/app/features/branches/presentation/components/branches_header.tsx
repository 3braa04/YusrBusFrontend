import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function BranchesHeader() {
  return (
    <div className="flex justify-between mb-8 gap-3">
      <div>
        <h1>إدارة الفروع</h1>
      </div>
      <Button variant="default">
        <PlusIcon className="h-4 w-4" />
        إضافة فرع جديد
      </Button>
    </div>
  );
}
