"use client";

import { useMemo } from "react";
import {
  sumDevPtsByContinent,
  devPtsPerContinent,
  getContinentsContributed,
  getCountOfPlayersContributed,
} from "../lib/utils";
import { ContributionData } from "../lib/types/types";

export function useDevPtsTable(data: ContributionData[]) {
  const totalDevPts = useMemo(() => sumDevPtsByContinent(data ?? []), [data]);
  const displayDevPts = useMemo(() => devPtsPerContinent(data ?? []), [data]);
  const totalContinents = useMemo(
    () => getContinentsContributed(data ?? []),
    [data]
  );
  const totalPlayers = useMemo(
    () => getCountOfPlayersContributed(data ?? []),
    [data]
  );

  return {
    totalDevPts,
    displayDevPts,
    totalContinents,
    totalPlayers,
  };
}
