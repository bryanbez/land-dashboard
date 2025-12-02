export const TableColumns = [
  "kingdomId",
  "continent",
  "name",
  "total",
] as const;

export const TotalDevPtsPerContinentColumns = ["continent", "total"] as const;

// union type for sorting by

export type TableSortKey = (typeof TableColumns)[number];

export type TableSortKeySmall = (typeof TotalDevPtsPerContinentColumns)[number];

export const HiddenColumn: TableSortKey[] = ["kingdomId"];

// for default rows

export interface TableRow {
  continent: number;
  total: number;
  kingdomId: string;
  name: string;
}

export interface TotalDevPtsPerContinentRow {
  continent: number;
  total: number;
}

// dynamic keys plus the default

export type TableRowDynamic<T = TableRow> = T &
  Partial<Record<string, string | number | null>>;
