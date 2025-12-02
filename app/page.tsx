"use client";
import { LandDataProvider } from "./context/landData";
import { SearchInputProvider } from "./context/searchInputs";
import MainComponent from "./layout/section/main";

export default function Home() {
  return (
    <SearchInputProvider>
      <LandDataProvider>
        <div className="flex items-center justify-center bg-gray-300 overflow-auto">
          <main>
            <MainComponent />
          </main>
        </div>
      </LandDataProvider>
    </SearchInputProvider>
  );
}
