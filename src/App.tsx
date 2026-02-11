import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './app/features/landing/landingPage';
import LoginPage from './app/features/login/loginPage';
import { ThemeProvider } from './components/theme-provider';
import Page from './app/features/dashboard/page'; // typo here – should probably be './dashboard'
import { TooltipProvider } from '@/components/ui/tooltip'; // adjust path if needed

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>   {/* ✅ added here */}

      <Router>      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Page />} />
        
        
        {/* 404 Route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
    </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;