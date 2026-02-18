import type { City } from "@/app/core/Data/City";
import CitiesApiService from "@/app/core/Networking/Services/CitiesApiService";
import { useEffect, useState } from "react";
import type { Country } from "../Data/Country";
import CountriesApiService from "../Networking/Services/CountriesApiService";

export default function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [fetchingCities, setFetchingCities] = useState(false);
  useEffect(() => {
    const loadCities = async () => {
      setFetchingCities(true);
      const citiesService = new CitiesApiService();
      const result = await citiesService.Filter(1, 100);
      
      if (result.data && Array.isArray(result.data.data)) {
        setCities(result.data.data);
      }
      setFetchingCities(false);
    };

    loadCities();
  }, []);

  return {cities, fetchingCities};

}