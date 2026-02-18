import { useEffect, useState } from "react";
import type { BaseEntity } from "../Data/BaseEntity";
import type { FilterResult } from "../Data/FilterResult";
import BaseApiService from "../Networking/BaseApiService";

export default function useEntities<T extends BaseEntity>(service: BaseApiService<T>) 
{
  const [entities, setEntities] = useState<FilterResult<T>>();

  useEffect(() => {
    const dataFetch = async () => {
      const result = await service.Filter(1, 100);

      if (result.data) setEntities(result.data);
    };
    dataFetch();
  }, []);

  const refreash = (newData?: T, deletedId?: number) => 
  {
    if(deletedId)
    {
      setEntities((prev) => {
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
      setEntities((prev) => {
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

  return {entities, refreash};
}
