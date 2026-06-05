import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveOutlineOffset = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const match = utility.match(/^(-?)outline-offset-(.+)$/);
  if (!match) return null;

  const [, negative, value] = match;
  const num = Number(value);

  if (!Number.isNaN(num))
    return [
      {
        selector: "",
        properties: {
          "outline-offset": negative ? `calc(${num}px * -1)` : `${num}px`,
        },
      },
    ];

  if (value.startsWith("(") && value.endsWith(")"))
    return [
      {
        selector: "",
        properties: { "outline-offset": `var(${value.slice(1, -1)})` },
      },
    ];

  if (value.startsWith("[") && value.endsWith("]"))
    return [
      {
        selector: "",
        properties: { "outline-offset": value.slice(1, -1).replace(/_/g, " ") },
      },
    ];

  return null;
};
