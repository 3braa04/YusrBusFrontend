import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './app/features/landing/landingPage';
import LoginPage from './app/features/login/loginPage';
import { ThemeProvider } from './components/theme-provider';
import DashboardPage from './app/features/dashboard/dashboardPage';
import { TooltipProvider } from './components/ui/tooltip';
import { DirectionProvider } from './components/ui/direction';

function App() {
  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          
          {/* 404 Route */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
      </ThemeProvider>
    </TooltipProvider>
    
  );
}

export default App;