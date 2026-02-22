import { useState, useEffect } from "react";
import type { Currency } from "../data/currency";
import CurrenciesApiService from "../networking/services/currenciesApiService";

export default function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fetchingCurrencies, setFetchingCurrencies] = useState(false);
  useEffect(() => {
    const loadCurrencies = async () => {
      setFetchingCurrencies(true);
      const currenciesService = new CurrenciesApiService();
      const result = await currenciesService.Filter(1, 100);
      
      if (result.data && Array.isArray(result.data.data)) {
        setCurrencies(result.data.data);
      }
      setFetchingCurrencies(false);
    };

    loadCurrencies();
  }, []);

  return {currencies, fetchingCurrencies};

}