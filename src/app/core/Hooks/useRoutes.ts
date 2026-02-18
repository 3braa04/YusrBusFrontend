import type { Route } from "@/app/features/Routes/Data/Route";
import { useEffect, useState } from "react";
import RoutesApiService from "../Networking/Services/RoutesApiService";

export default function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [fetchingRoutes, setFetchingRoutes] = useState(false);
  useEffect(() => {
    const loadRoutes = async () => {
      setFetchingRoutes(true);
      const routesService = new RoutesApiService();
      const result = await routesService.Filter(1, 100);
      
      if (result.data && Array.isArray(result.data.data)) {
        setRoutes(result.data.data);
      }
      setFetchingRoutes(false);
    };

    loadRoutes();
  }, []);

  return {routes, fetchingRoutes};

}