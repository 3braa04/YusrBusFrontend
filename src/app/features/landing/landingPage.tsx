import { ThemeToggle } from '@/app/core/components/theme/themeToggle';
import type { Country } from '@/app/core/Data/Country';
import CountriesApiService from '@/app/core/Networking/Services/CountriesApiService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const dataFetch = async () => {
      const service = new CountriesApiService();
      const result = await service.Filter(1, 100);
      setResponse(result.data?.data);
    }
    dataFetch();
  }, []);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
        Welcome to YusrBus
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Your journey, simplified.
      </p>

      <div className="mt-6">
        {response ? (
          <ul className="space-y-2">
            {response.map((country: Country) => (
              <li key={country.id} className="p-2 bg-white dark:bg-gray-800 rounded shadow">
                {country.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading countries...</p>
        )}
      </div>
      
      <Link to="/login">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 my-5 rounded-lg transition-all">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Landing;