import { ContributionData } from "./types/types";
import { CellValue } from "../layout/partials/Table/table.types";
import {
  TotalDevPtsPerContinentRow,
  TableRowDynamic,
} from "../layout/partials/Table/table.schema";

export const devPtsPerContinent = (
  data: ContributionData[]
): TableRowDynamic<TotalDevPtsPerContinentRow>[] => {
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

export const sumDevPtsByContinent = (data: ContributionData[]): number => {
  return data.reduce((sum, current) => sum + current.total, 0);
};

export const sortDevPts = <T extends TotalDevPtsPerContinentRow>(
  data: T[],
  order: "asc" | "desc" = "desc"
): TotalDevPtsPerContinentRow[] => {
  return [...data].sort((first, second) =>
    order === "desc" ? second.total - first.total : first.total - second.total
  );
};

export function toFixedAtTwoDecimalPlaces<Key extends string>(
  key: Key,
  value: CellValue
) {
  console.log(value);
  if (value == null) return "";
  return key === "total" && typeof value === "number"
    ? value.toFixed(2)
    : value;
}

export function getContinentsContributed(data: ContributionData[]): number {
  const uniqueContinents = Array.from(
    new Set(data.map((item) => item.continent))
  );
  return uniqueContinents.length;
}

export function getCountOfPlayersContributed(data: ContributionData[]): number {
  return data.length;
}

// export function extractDataKeys<T extends Record<string, any>>(rows: T[]) {
//   return Object.keys(rows[0] ?? {}) as (keyof T)[];
// }
