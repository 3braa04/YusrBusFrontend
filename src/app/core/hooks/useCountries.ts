import { useEffect, useState } from "react";
import type { Country } from "../Data/Country";
import CountriesApiService from "../Networking/Services/CountriesApiService";

export default function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [fetchingCountries, setFetchingCountries] = useState(false);
  useEffect(() => {
    const loadCountries = async () => {
      setFetchingCountries(true);
      const countriesService = new CountriesApiService();
      const result = await countriesService.Filter(1, 100);
      
      if (result.data && Array.isArray(result.data.data)) {
        setCountries(result.data.data);
      }
      setFetchingCountries(false);
    };

    loadCountries();
  }, []);

  return {countries, fetchingCountries};

}