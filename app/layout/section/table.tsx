import { useLandDataContext } from "@/app/context/landData";
import {
  sumOfTotalDevPtsinEveryContinent,
  totalDevPtsOnDateRangePicked,
  sortDevPts,
} from "@/app/lib/utils";

function DisplayDataInTableMode() {
  const { landData, errors } = useLandDataContext();

  const totalDevPts = totalDevPtsOnDateRangePicked(
    landData?.contribution ?? []
  );

  const devPtsPerContinent = sortDevPts(
    sumOfTotalDevPtsinEveryContinent(landData?.contribution ?? []),
    "desc"
  );

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
      {devPtsPerContinent.map((data, index) => (
        <p key={index}>{`Continent ${data.continent}: ${data.total.toFixed(
          2
        )}`}</p>
      ))}

      {/* Display result */}
      {landData && <pre>{JSON.stringify(landData, null, 2)}</pre>}
    </>
  );
}

export default DisplayDataInTableMode;
