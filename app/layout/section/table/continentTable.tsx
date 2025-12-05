"use client";

import { useMemo } from "react";
import { useLandDataContext } from "@/app/context/landData";
import { TotalDevPtsPerContinentColumns } from "../../partials/Table/table.schema";
import { useDevPtsTable } from "@/app/hooks/useDevPtsTable";
import TableComponent from "../../partials/Table/table";

function DevPtsPerContinentTable() {
  const { landData } = useLandDataContext();

  const data = useMemo(() => landData?.contribution ?? [], [landData]);

  const { displayDevPts } = useDevPtsTable(data ?? []);
  return (
    <>
      {landData && (
        <TableComponent
          data={displayDevPts}
          columns={TotalDevPtsPerContinentColumns}
        />
      )}
    </>
  );
}

export default DevPtsPerContinentTable;
