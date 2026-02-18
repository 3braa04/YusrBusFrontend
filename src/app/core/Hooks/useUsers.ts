import { useEffect, useState } from "react";
import type { FilterResult } from "../Data/FilterResult";
import type User from "@/app/features/Users/Data/User";
import UsersApiService from "../Networking/Services/UsersApiService";

export default function useUsers() 
{
  const [users, setUsers] = useState<FilterResult<User>>();

  useEffect(() => {
    const dataFetch = async () => {
      const service = new UsersApiService();
      const result = await service.Filter(1, 100);

      if (result.data) setUsers(result.data);
    };
    dataFetch();
  }, []);

  const refreash = (newData?: User, deletedId?: number) => 
  {
    if(deletedId)
    {
      setUsers((prev) => {
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
      setUsers((prev) => {
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

  return {users, refreash};
}
