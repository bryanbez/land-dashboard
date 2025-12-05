import type { UseFormRegister, Path, FieldValues } from "react-hook-form";

export type FormValues = {
  landID: string;
  fromDate: string;
  toDate: string;
};

export interface TextboxTypes<FormValues extends FieldValues> {
  inputName: Path<FormValues>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: "text" | "date";
  inputType?: string;
  register: UseFormRegister<FormValues>;
  errors: Partial<Record<keyof FormValues, { message?: string | undefined }>>;
}
