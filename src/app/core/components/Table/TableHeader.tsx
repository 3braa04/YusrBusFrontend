import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function TableHeader({ title, buttonTitle }: { title: string, buttonTitle: string }) {
  return (
    <div className="flex justify-between mb-8 gap-3">
      <div>
        <h1>{title}</h1>
      </div>
      <Button variant="default">
        <PlusIcon className="h-4 w-4" />
        {buttonTitle}
      </Button>
    </div>
  );
}
