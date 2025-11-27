"use client";
import React from "react";
import TextBoxComponent from "../partials/Textbox/textbox";
import { useSearchInputValue } from "@/app/context/searchInputs";
import { fetchLandIDDataApi } from "@/app/lib/callApi";
import type { LandIDResult } from "@/app/lib/types";
import { useLandDataContext } from "@/app/context/landData";

function SearchForm() {
  const { searchValue, fromDateValue, toDateValue } = useSearchInputValue();
  const { landData, setLandData, errors, setErrors } = useLandDataContext();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors([]);

    const executeFetch: LandIDResult = await fetchLandIDDataApi({
      landID: searchValue,
      fromDate: fromDateValue,
      toDate: toDateValue,
    });

    if (!executeFetch.result && executeFetch.err?.length) {
      const validationErrors = executeFetch.err.map((e) => e.code);
      setErrors(validationErrors);
      setLandData(null);
      return;
    }

    setLandData(executeFetch);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-4 gap-4 items-start border-2 border-black rounded-xl py-2 px-2">
        <div className="flex flex-col">
          <label className="mb-1">Land ID</label>
          <TextBoxComponent inputType="text" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">From</label>
          <TextBoxComponent inputType="dateFrom" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">To</label>
          <TextBoxComponent inputType="dateTo" />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;

{
  /* <div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-3 bg-white border border-gray-600 rounded-2xl shadow-sm w-full">
        <input {...textBoxProps} ref={searchTextBox} />
        <button
          type="submit"
          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
          Search
        </button>
      </form>
    </div> */
}
