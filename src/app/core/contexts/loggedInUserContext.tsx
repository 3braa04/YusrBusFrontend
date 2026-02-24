import type User from "@/app/features/users/data/user";
import { createContext, useContext, useState, type ReactNode } from "react";
import { ContextConstants } from "./contextConstants";
import type { UserBranch } from "@/app/features/users/data/user";

type LoggedInUserContextType = {
  loggedInUser: Partial<User> | undefined;
  activeBranch: UserBranch | null;
  updateLoggedInUser: (data: Partial<User>) => void;
  setActiveBranch: (branch: UserBranch) => void;
  clearUser: () => void;
};

const LoggedInUserContext = createContext<LoggedInUserContextType | undefined>(undefined);

export function LoggedInUserProvider({ children }: { children: ReactNode }) {

  const [loggedInUser, setLoggedInUser] = useState<Partial<User> | undefined>(() => {
    const savedUser = localStorage.getItem(ContextConstants.LoggedInUserStorageItemName);
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  const [activeBranch, setActiveBranchState] = useState<UserBranch | null>(() => {
    const stored = localStorage.getItem(ContextConstants.ActiveBranchStorageItemName);
    return stored ? JSON.parse(stored) : null;
  });

  const setActiveBranch = (branch: UserBranch) => {
    setActiveBranchState(branch);
    localStorage.setItem(ContextConstants.ActiveBranchStorageItemName, JSON.stringify(branch));
  };

  const updateLoggedInUser = (user: Partial<User>) => {
    setLoggedInUser(user);
    localStorage.setItem(ContextConstants.LoggedInUserStorageItemName, JSON.stringify(user));
    
    if (!activeBranch && user.userBranches?.length) {
      setActiveBranch(user.userBranches[0]);
    }
  };

  const clearUser = () => {
    localStorage.removeItem(ContextConstants.LoggedInUserStorageItemName);
    localStorage.removeItem(ContextConstants.ActiveBranchStorageItemName);
    setLoggedInUser(undefined);
    setActiveBranchState(null);
  };

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, activeBranch, updateLoggedInUser, setActiveBranch, clearUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
}

export const useLoggedInUser = () => {

  const context = useContext(LoggedInUserContext);

  if (!context) throw new Error("useLoggedInUser must be used within a LoggedInUserProvider");

  return context;

};