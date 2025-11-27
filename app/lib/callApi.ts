import { ContextParams, ContextParamsSchema } from "./validator";
import type { LandIDResult } from "./types";

export async function fetchLandIDDataApi(
  params: ContextParams
): Promise<LandIDResult> {
  const parsed = ContextParamsSchema.safeParse(params);

  if (!parsed.success) {
    return {
      result: false,
      err: parsed.error.issues.map((e) => ({ code: e.message })),
    };
  }

  const parsedData = parsed.data;

  try {
    const res = await fetch("http://localhost:3000/api/land", {
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
