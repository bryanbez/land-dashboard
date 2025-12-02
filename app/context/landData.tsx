import { createContext, useContext, useState, ReactNode } from "react";
import type { LandIDResult } from "../lib/types/types";

type LandDataContextType = {
  landData: LandIDResult | null;
  errors: string[];
  setLandData: (data: LandIDResult | null) => void;
  setErrors: (errors: string[]) => void;
};

export const LandDataContext = createContext<LandDataContextType | undefined>(
  undefined
);

export function LandDataProvider({ children }: { children: ReactNode }) {
  const [landData, setLandData] = useState<LandIDResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <LandDataContext.Provider
      value={{ landData, errors, setLandData, setErrors }}>
      {children}
    </LandDataContext.Provider>
  );
}

export const useLandDataContext = () => {
  const context = useContext(LandDataContext);
  if (!context)
    throw new Error(
      "useLandDataContext must be used within a LandDataProvider"
    );
  return context;
};
