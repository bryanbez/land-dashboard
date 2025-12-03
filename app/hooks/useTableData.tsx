"use client";

import { useMemo, useState } from "react";
import { TableSortKey } from "../layout/partials/Table/table.schema";
import {
  paginateTableData,
  sortTableData,
} from "../layout/partials/Table/table.handler";

export function useTableData<T extends Record<string, unknown>>(
  rawData: T[],
  defaultSort: TableSortKey = "total"
) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<TableSortKey>(defaultSort);

  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    return sortTableData(rawData, sortBy, sortDir);
  }, [rawData, sortBy, sortDir]);

  const paginatedData = useMemo(() => {
    return paginateTableData(sortedData, page, 15);
  }, [sortedData, page]);

  const onToggleSortBy = (key: TableSortKey) => {
    if (sortBy === null) {
      setSortBy(key);
      setSortDir("desc");
      setPage(1);
      return;
    }
    if (key === sortBy) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("desc");
    }

    setPage(1);
  };

  return {
    page,
    sortBy,
    sortDir,

    sortedData,
    paginatedData,

    setPage,
    onToggleSortBy,
  };
}
