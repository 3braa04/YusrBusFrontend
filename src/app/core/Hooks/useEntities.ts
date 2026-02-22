import { useEffect, useState } from "react";
import type { BaseEntity } from "../Data/BaseEntity";
import type { FilterResult } from "../Data/FilterResult";
import BaseApiService from "../Networking/BaseApiService";

export default function useEntities<T extends BaseEntity>(service: BaseApiService<T>) 
{
  const [entities, setEntities] = useState<FilterResult<T>>();
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      const result = await service.Filter(currentPage, rowsPerPage);
      setLoading(false);

      if (result.data) setEntities(result.data);
    };
    dataFetch();
  }, [currentPage, rowsPerPage]);

  const refreash = (newData?: T, deletedId?: number) => 
  {
    if(deletedId)
    {
      setEntities((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          count: prev.count - 1,
          data: prev.data?.filter((b) => b.id !== deletedId) ?? undefined,
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
            data: prev.data?.map(b => b.id === newData.id ? newData : b) ?? undefined
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

  return {entities, refreash, isLoading, currentPage, setCurrentPage, setRowsPerPage};
}

