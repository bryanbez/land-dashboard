import { ContextParams, ContextParamsSchema } from "./validator";
import type { LandIDResult } from "./types/types";

export async function fetchLandIDDataApi(
  params: ContextParams
): Promise<LandIDResult> {
  const parsed = ContextParamsSchema.safeParse(params);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  if (!parsed.success) {
    return {
      result: false,
      err: parsed.error.issues.map((e) => ({ code: e.message })),
    };
  }

  const parsedData = parsed.data;

  // const tempData = {
  //   // for cut time filling textboxes for debugging. just click the search
  //   landID: "134541",
  //   fromDate: "2025-11-28",
  //   toDate: "2025-12-02",
  // };

  try {
    const res = await fetch(`${baseURL}/api/land`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return {
        result: false,
        err: errorData?.err ?? [{ code: `Server returned ${res.status}` }],
      };
    }

    const data: LandIDResult = await res.json();

    return data;
  } catch (error) {
    return {
      result: false,
      err: [
        {
          code:
            error instanceof Error ? error.message : "Unknown Error Occured",
        },
      ],
    };
  }
}
