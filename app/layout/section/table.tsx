"use client";

import { useMemo, useState } from "react";
import { useLandDataContext } from "@/app/context/landData";
import { devPtsPerContinent, sumDevPtsByContinent } from "@/app/lib/utils";
import TableComponent from "../partials/Table/table";
import {
  sortTableData,
  paginateTableData,
} from "../partials/Table/table.handler";
import {
  TableColumns,
  TableSortKey,
  TotalDevPtsPerContinentRow,
  TotalDevPtsPerContinentColumns,
  HiddenColumn,
  TableRowDynamic,
} from "../partials/Table/table.schema";

function DisplayDataInTableMode() {
  const { landData, errors } = useLandDataContext();

  const data = useMemo(() => landData?.contribution ?? [], [landData]);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<TableSortKey>("total");

  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const totalDevPts = sumDevPtsByContinent(data);
  const displayDevPts = devPtsPerContinent(data);

  const sortedDataOutput = sortTableData(data, sortBy, sortDir);
  const paginatedData = paginateTableData(sortedDataOutput, page, 15);

  const handleSorting = (key: TableSortKey) => {
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
  return (
    <>
      {errors.length > 0 && (
        <div style={{ color: "red" }}>
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}

      {totalDevPts && <p>{totalDevPts.toFixed(2)}</p>}
      {landData && (
        <TableComponent
          data={displayDevPts}
          columns={TotalDevPtsPerContinentColumns}
        />
      )}
      {landData && (
        <TableComponent
          data={paginatedData ?? []}
          columns={TableColumns}
          onToggleSortBy={handleSorting}
          hiddenColumns={HiddenColumn}
        />
      )}
    </>
  );
}

export default DisplayDataInTableMode;
