import { useDevPtsTable } from "@/app/hooks/useDevPtsTable";
import SearchForm from "./form";
import TreeMapGraph from "./graph/treemap";
import DevPtsPerContinentTable from "./table/continentTable";
import DevPtsPerPlayerTable from "./table/playersTable";
import { useLandDataContext } from "@/app/context/landData";

function MainComponent() {
  const { landData } = useLandDataContext();

  const { totalDevPts, totalContinents, totalPlayers } = useDevPtsTable(
    landData?.contribution ?? []
  );
  return (
    <div className="w-[70%] min-h-screen p-6 space-y-6">
      <div className="text-2xl font-semibold">
        LAND DEVELOPMENT POINTS TRACKER
      </div>
      <div>
        <SearchForm />
      </div>
      {landData?.contribution && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl shadow flex flex-col">
              <span className="text-3xl font-extrabold">{totalContinents}</span>
              <span className="text-xs text-gray-500 tracking-wide uppercase">
                Continents
              </span>
            </div>
            <div className="p-6 bg-white rounded-xl shadow flex flex-col">
              <span className="text-3xl font-extrabold">
                {totalDevPts.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 tracking-wide uppercase">
                Development Pts
              </span>
            </div>
            <div className="p-6 bg-white rounded-xl shadow flex flex-col">
              <span className="text-3xl font-extrabold">{totalPlayers}</span>
              <span className="text-xs text-gray-500 tracking-wide uppercase">
                Players Contributed
              </span>
            </div>
            <div className="p-6 bg-white rounded-xl shadow flex flex-col">
              <span className="text-3xl font-extrabold">0</span>
              <span className="text-xs text-gray-500 tracking-wide uppercase">
                Estimate Revenue
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Development Points Per Continent Table
                </h2>
              </div>
              <DevPtsPerContinentTable />
            </div>
            <div className="p-4 bg-white rounded-xl shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Graph Overview</h2>
              </div>
              <TreeMapGraph />
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Development Points Per Player Table
              </h2>
            </div>
            <DevPtsPerPlayerTable />
          </div>
        </>
      )}
    </div>
  );
}

export default MainComponent;
