import { createContext, useContext, useState, ReactNode } from "react";

type SearchInputsContextType = {
  searchValue: string;
  setSearchValue: (v: string) => void;
  fromDateValue: string;
  setFromDateValue: (v: string) => void;
  toDateValue: string;
  setToDateValue: (v: string) => void;
};

const SearchInputContext = createContext<SearchInputsContextType | undefined>(
  undefined
);

export const SearchInputProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [fromDateValue, setFromDateValue] = useState<string>("");
  const [toDateValue, setToDateValue] = useState<string>("");

  return (
    <SearchInputContext.Provider
      value={{
        searchValue,
        setSearchValue,
        fromDateValue,
        setFromDateValue,
        toDateValue,
        setToDateValue,
      }}>
      {children}
    </SearchInputContext.Provider>
  );
};

export const useSearchInputValue = () => {
  const context = useContext(SearchInputContext);
  if (!context)
    throw new Error(
      "useSearchInputValue must be used within a SearchInputProvider"
    );
  return context;
};
