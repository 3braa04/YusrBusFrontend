import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './app/features/landing/landingPage';
import LoginPage from './app/features/login/loginPage';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* 404 Route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;