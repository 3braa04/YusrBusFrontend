import { createContext, useContext, useState, type ReactNode } from "react";
import { AuthConstants } from "./AuthConstants";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(AuthConstants.AuthCheckStorageItemName) === "true"
  );

  const login = () => {
    localStorage.setItem(AuthConstants.AuthCheckStorageItemName, "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AuthConstants.AuthCheckStorageItemName);
    setIsAuthenticated(false);
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