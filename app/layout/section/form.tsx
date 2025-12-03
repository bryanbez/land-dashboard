"use client";
import React from "react";
import TextBoxComponent from "../partials/Textbox/textbox";
import { useSearchInputValue } from "@/app/context/searchInputs";
import { fetchLandIDDataApi } from "@/app/lib/callApi";
import type { LandIDResult } from "@/app/lib/types/types";
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
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl shadow">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Land ID</label>
          <TextBoxComponent inputType="text" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">From</label>
          <TextBoxComponent inputType="dateFrom" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">To</label>
          <TextBoxComponent inputType="dateTo" />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
