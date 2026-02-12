import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardPage from "./app/features/dashboard/dashboardPage";
import LandingPage from "./app/features/landing/landingPage";
import LoginPage from "./app/features/login/loginPage";
import { ThemeProvider } from "./app/core/components/theme/themeProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import MainPage from "./app/features/main/mainPage";
import Testing from "./app/test";
import useAppInitialization from "./hooks/useAppInitialization";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const { isLoading } = useAppInitialization();

  if(isLoading)
    return <Apploading />;

  return <AppBody />;
}

function AppBody() {
  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/testing" element={<Testing />} />

            <Route element={<MainPage />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/trips" element={<h1>trips is working!</h1>} />
              <Route
                path="/passengers"
                element={<h1>passengers is working!</h1>}
              />
              <Route path="/routes" element={<h1>routes is working!</h1>} />
              <Route path="/branches" element={<h1>branches is working!</h1>} />
              <Route path="/users" element={<h1>users is working!</h1>} />
              <Route path="/settings" element={<h1>settings is working!</h1>} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </TooltipProvider>
  );
}
function Apploading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default App;
