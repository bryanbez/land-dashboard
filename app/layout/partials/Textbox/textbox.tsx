"use client";
import type { FormValues } from "./textbox.types";
import type { FieldValues } from "react-hook-form";
import type { TextboxTypes } from "./textbox.types";

import { useSearchInputValue } from "@/app/context/searchInputs";

function TextBoxComponent<FormValues extends FieldValues>({
  inputName,
  type,
  errors,
  register,
}: TextboxTypes<FormValues>) {
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

  if (inputName === "landID") {
    value = searchValue;
    onChange = (e) => setSearchValue(e.target.value);
  }

  if (inputName === "fromDate") {
    value = fromDateValue;
    onChange = (e) => setFromDateValue(e.target.value);
  }

  if (inputName === "toDate") {
    value = toDateValue;
    onChange = (e) => setToDateValue(e.target.value);
  }

  return (
    <>
      <input
        type={type}
        {...register(inputName)}
        value={value}
        className={`${
          errors?.[inputName] ? "border-red-500" : "border-gray-300"
        }w-full resize-none text-black overflow-hidden bg-transparent focus:outline-none text-sm placeholder-gray-400 py-2`}
        onChange={onChange}
      />
      {errors?.[inputName]?.message && (
        <p className="text-red-500 text-sm mt-1">{errors[inputName].message}</p>
      )}
    </>
  );
}

export default TextBoxComponent;
