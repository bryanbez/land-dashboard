"use client";
import { SearchInputProvider } from "./context/searchInputs";
import MainComponent from "./layout/section/main";

export default function Home() {
  return (
    <SearchInputProvider>
      <div className="flex h-screen items-center justify-center bg-gray-300">
        <main className="flex h-[90%] w-[90%] items-center justify-center bg-gray-50 rounded-2xl shadow-2xl">
          <MainComponent />
        </main>
      </div>
    </SearchInputProvider>
  );
}
