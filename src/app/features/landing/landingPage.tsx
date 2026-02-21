import { ThemeToggle } from '@/app/core/components/theme/themeToggle';
import { Link } from 'react-router-dom';

const Landing = () => {

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
      
      <Link to="/login">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 my-5 rounded-lg transition-all">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Landing;