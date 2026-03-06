import type User from "@/app/features/users/data/user";
import { createContext, useContext, useState, type ReactNode } from "react";
import { ContextConstants } from "./contextConstants";

type LoggedInUserContextType = {
  loggedInUser: Partial<User> | undefined;
  updateLoggedInUser: (data: Partial<User>) => void;
  clearUser: () => void;
};

const LoggedInUserContext = createContext<LoggedInUserContextType | undefined>(undefined);

export function LoggedInUserProvider({ children }: { children: ReactNode }) {

  const [loggedInUser, setLoggedInUser] = useState<Partial<User> | undefined>(() => {
    const savedUser = localStorage.getItem(ContextConstants.LoggedInUserStorageItemName);
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  const updateLoggedInUser = (user: Partial<User>) => {
    setLoggedInUser(user);
    localStorage.setItem(ContextConstants.LoggedInUserStorageItemName, JSON.stringify(user));
  };

  const clearUser = () => {
    localStorage.removeItem(ContextConstants.LoggedInUserStorageItemName);
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