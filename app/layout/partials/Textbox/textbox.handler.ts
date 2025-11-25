import { useSearchInputValue } from "@/app/context/searchInputs";

export function useTextboxHandler() {
  const {
    searchValue,
    setSearchValue,
    fromDateValue,
    setFromDateValue,
    toDateValue,
    setToDateValue,
  } = useSearchInputValue();

  return {
    searchValue,
    setSearchValue,
    fromDateValue,
    setFromDateValue,
    toDateValue,
    setToDateValue,
  };
}
