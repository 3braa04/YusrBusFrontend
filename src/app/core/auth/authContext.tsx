import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AuthConstants } from "./authConstants";
import { useSetting } from "../contexts/settingContext";
import { useLoggedInUser } from "../contexts/loggedInUserContext";
import type User from "@/app/features/users/data/user";
import { ContextConstants } from "../contexts/contextConstants";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (user?: User) => void;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const {clearSetting} = useSetting();
  const { updateLoggedInUser, clearUser } = useLoggedInUser();

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

  useEffect(() => {
    const syncAuth = () => {
      const authStatus = localStorage.getItem(AuthConstants.AuthCheckStorageItemName) === "true";
      setIsAuthenticated(authStatus);
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const login = (user?: User) => {
    localStorage.setItem(AuthConstants.AuthCheckStorageItemName, "true");
    
    if(user)
      updateLoggedInUser(user);
    
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AuthConstants.AuthCheckStorageItemName);
    localStorage.removeItem(ContextConstants.ActiveBranchStorageItemName);
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