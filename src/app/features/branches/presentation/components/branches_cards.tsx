import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin } from "lucide-react";

type BranchesCardsProps = {
    totalBranches:number;
    totalCities:number;

}

export default function BranchesCards({totalBranches, totalCities}:BranchesCardsProps) {
    return <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              إجمالي الفروع
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBranches}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              المدن المغطاة
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCities}</div>
          </CardContent>
        </Card>
      </div>
}