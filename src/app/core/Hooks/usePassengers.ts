import type { Passenger } from "@/app/features/Passengers/Data/Passenger";
import { useEffect, useState } from "react";
import PassengersApiService from "../Networking/Services/PassengersApiService";

export default function usePassengers() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [fetchingPassenger, setFetchingPassenger] = useState(false);
  useEffect(() => {
    const loadPassenger = async () => {
      setFetchingPassenger(true);
      const countriesService = new PassengersApiService();
      const result = await countriesService.Filter(1, 100);
      
      if (result.data && Array.isArray(result.data.data)) {
        setPassengers(result.data.data);
      }
      setFetchingPassenger(false);
    };

    loadPassenger();
  }, []);

  return {passengers, fetchingPassenger};

}