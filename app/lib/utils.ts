import { ContributionData, DevPtsPerContinent } from "./types";

export const sumOfTotalDevPtsinEveryContinent = (
  data: ContributionData[]
): DevPtsPerContinent[] => {
  const groupedPtsPerContinent = data.reduce<Record<number, number>>(
    (acc, current) => {
      if (!acc[current.continent]) acc[current.continent] = 0;
      acc[current.continent] += current.total;
      return acc;
    },
    {}
  );

  const output = Object.entries(groupedPtsPerContinent).map(
    ([continent, total]) => ({
      continent: Number(continent),
      total,
    })
  );

  return output;
};

export const totalDevPtsOnDateRangePicked = (
  data: ContributionData[]
): number => {
  return data.reduce((sum, current) => sum + current.total, 0);
};

export const sortDevPts = <T extends { continent: number; total: number }>(
  data: T[],
  order: "asc" | "desc" = "desc"
): DevPtsPerContinent[] => {
  return [...data].sort((first, second) =>
    order === "desc" ? second.total - first.total : first.total - second.total
  );
};
