import { TextboxTypes } from "./textbox.types";
import type { FormValues } from "./textbox.types";

export const TextBoxConstant = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: TextboxTypes<FormValues>) => ({
  value,
  onChange,
  placeholder,
  type,
  className,
});
