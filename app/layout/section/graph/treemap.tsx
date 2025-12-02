"use client";

import { useLandDataContext } from "@/app/context/landData";
import { devPtsPerContinent, sumDevPtsByContinent } from "@/app/lib/utils";
import { Treemap, Tooltip, ResponsiveContainer, Legend } from "recharts";

type TreemapNode = {
  name: string;
  size: number;
};

type LegendPayLoadItem = {
  value: string;
  type: string;
  color: string;
  payload: TreemapNode;
};

type CustomLegendProps = {
  payload?: LegendPayLoadItem[];
  totalDevPts: number;
};

function TreeMapGraph() {
  const { landData } = useLandDataContext();

  const continents = devPtsPerContinent(landData?.contribution ?? []);

  const treemapData: TreemapNode[] = continents.map((c) => ({
    name: `${c.continent}`,
    size: c.total,
  }));

  const totalDevPts = sumDevPtsByContinent(landData?.contribution ?? []);

  const CustomLegend = ({ payload, totalDevPts }: CustomLegendProps) => {
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {payload?.map((entry, index) => {
          const percent = ((entry.payload.size / totalDevPts) * 100).toFixed(2);
          return (
            <li key={index} style={{ color: entry.color }}>
              {`${entry.value}: ${percent}%`}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {landData && (
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <Treemap
              data={treemapData}
              dataKey="size"
              stroke="#FFF"
              fill="#8884d8">
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                content={(props) => (
                  <CustomLegend
                    payload={props.payload as LegendPayLoadItem[]}
                    totalDevPts={totalDevPts}
                  />
                )}></Legend>
            </Treemap>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}

export default TreeMapGraph;
