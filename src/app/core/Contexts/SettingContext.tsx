import { Setting } from "@/app/core/Data/Setting";
import { createContext, useContext, useState, type ReactNode } from "react";

type SettingContextType = {
  setting: Partial<Setting> | undefined;
  updateSetting: (data: Partial<Setting>) => void;
  clearSetting: () => void;
};

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export function SettingProvider({ children }: { children: ReactNode }) {

  const localStorageItemName = "Setting";

  const [setting, setSetting] = useState<Partial<Setting> | undefined>(() => {
    const savedSetting = localStorage.getItem(localStorageItemName);
    return savedSetting ? JSON.parse(savedSetting) : undefined;
  });

  const updateSetting = (data: Partial<Setting>) => {
    setSetting((prev) => {
      const newSetting = { ...prev, ...data };
      localStorage.setItem(localStorageItemName, JSON.stringify(newSetting));
      return newSetting;
    });
  };

  const clearSetting = () => {
    localStorage.removeItem(localStorageItemName);
    setSetting(undefined);
  };

  return (
    <SettingContext.Provider value={{ setting, updateSetting, clearSetting }}>
      {children}
    </SettingContext.Provider>
  );
}

export const useSetting = () => {
  const context = useContext(SettingContext);
  if (!context) throw new Error("useSetting must be used within a SettingProvider");
  return context;
};