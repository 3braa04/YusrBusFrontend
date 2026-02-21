import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AuthConstants } from "./AuthConstants";
import { useSetting } from "../Contexts/SettingContext";
import { useLoggedInUser } from "../Contexts/LoggedInUserContext";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const {clearSetting} = useSetting();
  const {clearUser} = useLoggedInUser();

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(AuthConstants.AuthCheckStorageItemName) === "true"
  );
  
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener(AuthConstants.UnauthorizedEventName, handleUnauthorized);
    return () => window.removeEventListener(AuthConstants.UnauthorizedEventName, handleUnauthorized);
  }, []);

  const login = () => {
    localStorage.setItem(AuthConstants.AuthCheckStorageItemName, "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AuthConstants.AuthCheckStorageItemName);
    setIsAuthenticated(false);
    clearSetting();
    clearUser();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};