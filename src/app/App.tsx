import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton";
import { TooltipProvider } from "../components/ui/tooltip";
import useAppInitialization from "../hooks/useAppInitialization";
import { AuthProvider } from "./core/Auth/AuthContext";
import ProtectedRoute from "./core/Auth/ProtectedRoute";
import { ThemeProvider } from "./core/components/theme/themeProvider";
import { CompanyProvider } from "./core/Contexts/CompanyContext";
import RoutesService from "./core/Services/constants/RoutesService";
import BranchesPage from "./features/branches/presentation/BranchesPage";
import DashboardPage from "./features/dashboard/dashboardPage";
import LandingPage from "./features/landing/landingPage";
import LoginPage from "./features/login/loginPage";
import MainPage from "./features/main/mainPage";
import PassengersPage from "./features/Passengers/Presentation/PassengersPage";
import PrfilePage from "./features/profile/PrfilePage";
import RoutesPage from "./features/Routes/Presentation/RoutesPage";
import SettingPage from "./features/Setting/SettingPage";
import TripsPage from "./features/Trips/Presentation/TripsPage";
import UsersPage from "./features/Users/Presentation/UsersPage";

function App() {  
  const { isLoading } = useAppInitialization();

  if(isLoading)
    return <Apploading />;

  return <AppBody />;
}

function AppBody() {
  return (
    <AuthProvider>
      <TooltipProvider>   
        <CompanyProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppRoutes />
          </ThemeProvider>
        </CompanyProvider>  
      </TooltipProvider>
    </AuthProvider>
  );
}

function Apploading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainPage />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/passengers" element={<PassengersPage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/branches" element={<BranchesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path={RoutesService.Profile} element={<PrfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
