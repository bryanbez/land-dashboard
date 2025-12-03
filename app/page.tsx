"use client";
import { LandDataProvider } from "./context/landData";
import { SearchInputProvider } from "./context/searchInputs";
import MainComponent from "./layout/section/main";

export default function Home() {
  return (
    <SearchInputProvider>
      <LandDataProvider>
        <div className="w-full flex items-center justify-center bg-gray-300 overflow-auto">
          <MainComponent />
        </div>
      </LandDataProvider>
    </SearchInputProvider>
  );
}
