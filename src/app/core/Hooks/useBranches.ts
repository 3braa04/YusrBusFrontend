import { useEffect, useState } from "react";
import BranchesApiService from "../Networking/Services/BranchesApiService";
import type Branch from "@/app/features/branches/data/Branch";
import type { FilterResult } from "../Data/FilterResult";

export default function useBranches() 
{
  const [branches, setBranches] = useState<FilterResult<Branch>>();

  useEffect(() => {
    const dataFetch = async () => {
      const service = new BranchesApiService();
      const result = await service.Filter(1, 100);

      if (result.data) setBranches(result.data);
    };
    dataFetch();
  }, []);

  const refreash = (newData?: Branch, deletedId?: number) => 
  {
    if(deletedId)
    {
      setBranches((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          count: prev.count - 1,
          data: prev.data?.filter((b) => b.id !== deletedId) ?? null,
        };
      });
    }

    else if (newData)
    {
      setBranches((prev) => {
        if (!prev) return prev;

        const exists = prev.data?.find(b => b.id === newData.id);
        
        if (exists) {
          return {
            ...prev,
            data: prev.data?.map(b => b.id === newData.id ? newData : b) ?? null
          };
        } 
        
        return {
          ...prev,
          count: prev.count + 1,
          data: [newData, ...(prev.data ?? [])]
        };
      });
    }   
  };

  return {branches, refreash};
}
