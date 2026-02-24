import { useEffect, useState } from "react";
import type { Country } from "../data/country";
import CountriesApiService from "../networking/services/countriesApiService";
import type { FilterCondition } from "../data/filterCondition";

export default function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [fetchingCountries, setFetchingCountries] = useState(false);
  
  useEffect(() => {
    filterCountries();
  }, []);

  const filterCountries = async (condition?: FilterCondition) => {
    setFetchingCountries(true);
    const countriesService = new CountriesApiService();
    const result = await countriesService.Filter(1, 100, condition);
    
    if (result.data && Array.isArray(result.data.data)) {
      setCountries(result.data.data);
    }
    setFetchingCountries(false);
  };

  return {countries, fetchingCountries, filterCountries};

}