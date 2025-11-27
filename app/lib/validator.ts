import { z } from "zod";

export const LandIDSchema = z.string().regex(/^1[0-9]{5}$/, {
  message: "Land ID must start with 1 and have 6 digits",
});

export const DateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "Date must be in YYYY-MM-DD format",
});

export const ContextParamsSchema = z
  .object({
    landID: LandIDSchema,
    fromDate: DateStringSchema,
    toDate: DateStringSchema,
  })
  .refine((data) => new Date(data.fromDate) <= new Date(data.toDate), {
    message: "FromDate must be before or equal to ToDate",
    path: ["toDate"],
  });

export type ContextParams = z.infer<typeof ContextParamsSchema>;
