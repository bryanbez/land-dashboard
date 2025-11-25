"use client";

import { useSearchInputValue } from "@/app/context/searchInputs";

function TextBoxComponent({ inputType }: { inputType: string }) {
  const {
    searchValue,
    setSearchValue,
    fromDateValue,
    setFromDateValue,
    toDateValue,
    setToDateValue,
  } = useSearchInputValue();

  let value = "";
  let onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = () => {};

  if (inputType === "text") {
    value = searchValue;
    onChange = (e) => setSearchValue(e.target.value);
  }

  if (inputType === "dateFrom") {
    value = fromDateValue;
    onChange = (e) => setFromDateValue(e.target.value);
  }

  if (inputType === "dateTo") {
    value = toDateValue;
    onChange = (e) => setToDateValue(e.target.value);
  }

  return (
    <input
      type={inputType.includes("date") ? "date" : "text"}
      value={value}
      onChange={onChange}
      className="w-full resize-none text-black overflow-hidden bg-transparent focus:outline-none text-sm placeholder-gray-400 py-2"
    />
  );
}

export default TextBoxComponent;
