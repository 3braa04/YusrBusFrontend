import type { City } from "@/app/core/data/city";
import CitiesApiService from "@/app/core/networking/services/citiesApiService";
import { useEffect, useState } from "react";
import type { FilterCondition } from "../data/filterCondition";

export default function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [fetchingCities, setFetchingCities] = useState(false);
  
  useEffect(() => { 
    filterCities();
  }, []);

  const filterCities = async (condition?: FilterCondition) => {
    setFetchingCities(true);
    const citiesService = new CitiesApiService();
    const result = await citiesService.Filter(1, 100, condition);
    
    if (result.data && Array.isArray(result.data.data)) {
      setCities(result.data.data);
    }
    setFetchingCities(false);
  };

  return {cities, fetchingCities, filterCities};

}