import type User from "@/app/features/Users/Data/User";
import { createContext, useContext, useState, type ReactNode } from "react";

type LoggedInUserContextType = {
  loggedInUser: Partial<User> | undefined;
  updateLoggedInUser: (data: Partial<User>) => void;
  clearUser: () => void;
};

const LoggedInUserContext = createContext<LoggedInUserContextType | undefined>(undefined);

export function LoggedInUserProvider({ children }: { children: ReactNode }) {

  const localStorageItemName = "LoggedInUser";

  const [loggedInUser, setLoggedInUser] = useState<Partial<User> | undefined>(() => {
    const savedUser = localStorage.getItem(localStorageItemName);
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  const updateLoggedInUser = (data: Partial<User>) => {
    setLoggedInUser((prev) => {
      const newUser = { ...prev, ...data };
      localStorage.setItem(localStorageItemName, JSON.stringify(newUser));
      return newUser;
    });
  };

  const clearUser = () => {
    localStorage.removeItem(localStorageItemName);
    setLoggedInUser(undefined);
  };

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, updateLoggedInUser, clearUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
}

export const useLoggedInUser = () => {

  const context = useContext(LoggedInUserContext);

  if (!context) throw new Error("useLoggedInUser must be used within a LoggedInUserProvider");

  return context;

};