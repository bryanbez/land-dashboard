import { NextResponse } from "next/server";
import { ContextParams, ContextParamsSchema } from "@/app/lib/validator";
import type { LandIDResult } from "@/app/lib/types";

export async function POST(req: Request): Promise<NextResponse<LandIDResult>> {
  try {
    const body = await req.json();

    const parsedParams = ContextParamsSchema.safeParse(body);
    if (!parsedParams.success) {
      return NextResponse.json(
        {
          result: false,
          err: parsedParams.error.issues.map((e) => ({ code: e.message })),
        },
        { status: 400 }
      );
    }

    const { landID, fromDate, toDate }: ContextParams = parsedParams.data;

    const fetchData = await fetch(
      `https://api-lok-live.leagueofkingdoms.com/api/stat/land/contribution?landId=${landID}&from=${fromDate}&to=${toDate}`
    );

    if (!fetchData.ok) {
      return NextResponse.json(
        {
          result: false,
          err: [{ code: `External API Error: ${fetchData.status}` }],
        },
        { status: 502 }
      );
    }

    const data: LandIDResult = await fetchData.json();
    console.log(data);

    const response: LandIDResult = {
      result: data.result,
      owner: data.owner,
      contribution: data.contribution,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { result: false, err: [{ code: `Server Error: ${error}` }] },
      { status: 500 }
    );
  }
}
