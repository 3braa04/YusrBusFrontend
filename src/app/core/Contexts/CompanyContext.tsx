import { Setting } from "@/app/core/Data/Setting";
import { createContext, useContext, useState, type ReactNode } from "react";

type CompanyContextType = {
  companyData: Partial<Setting> | null;
  updateCompanyData: (data: Partial<Setting>) => void;
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [companyData, setCompanyData] = useState<Partial<Setting> | null>(null);

  const updateCompanyData = (data: Partial<Setting>) => {
    setCompanyData((prev) => ({ ...prev, ...data }));
  };

  return (
    <CompanyContext.Provider value={{ companyData, updateCompanyData }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) throw new Error("useCompany must be used within a CompanyProvider");
  return context;
};