"use client";

import { useMemo } from "react";
import { useLandDataContext } from "@/app/context/landData";
import TableComponent from "../../partials/Table/table";
import { TableColumns, HiddenColumn } from "../../partials/Table/table.schema";
import { useTableData } from "@/app/hooks/useTableData";

function DevPtsPerPlayerTable() {
  const { landData } = useLandDataContext();

  const data = useMemo(() => landData?.contribution ?? [], [landData]);

  const { paginatedData, onToggleSortBy } = useTableData(data, "total");
  return (
    <>
      {landData && (
        <TableComponent
          data={paginatedData ?? []}
          columns={TableColumns}
          onToggleSortBy={onToggleSortBy}
          hiddenColumns={HiddenColumn}
        />
      )}
    </>
  );
}

export default DevPtsPerPlayerTable;
