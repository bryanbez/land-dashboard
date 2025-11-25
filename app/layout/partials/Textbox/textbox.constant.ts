import { TextboxTypes } from "./textbox.types";

export const TextBoxConstant = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: TextboxTypes) => ({
  value,
  onChange,
  placeholder,
  type,
  className,
});
