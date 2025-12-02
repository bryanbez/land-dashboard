export type CellValue = string | number | boolean | null | undefined;

export type CellValueWithoutBoolean = string | number;

export type TableRow = Record<string, CellValue>;

export type TableDataItemType = Record<string, string | number | null>;

export type TableSortKey = keyof TableDataItemType;

export type ColumnType = {
  key: keyof TableDataItemType;
  label: string;
  hidden?: boolean;
};

export type TableProps = {
  data: TableRow[];
  limit?: number;
  columns: { key: TableSortKey; label: string; hidden?: boolean }[];
  sortBy?: TableSortKey | null;
  sortDir?: "asc" | "desc";
  onToggleSortBy?: (key: string | TableSortKey) => void;
};
