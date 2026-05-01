import type { CSSRule, ResolvedConfig } from "../../types";

const resolveOutlineValue = (value: string | undefined): string | null => {
  if (!value) return "1px";

  const num = Number(value);

  if (!Number.isNaN(num)) return `${num}px`;

  if (value.startsWith("(length:") && value.endsWith(")"))
    return `var(${value.slice(8, -1)})`;

  if (value.startsWith("[") && value.endsWith("]"))
    return value.slice(1, -1).replace(/_/g, " ");

  return null;
};

export const resolveOutlineWidth = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const match = utility.match(/^outline(?:-(.+))?$/);
  if (!match) return null;

  const resolved = resolveOutlineValue(match[1]);
  if (!resolved) return null;

  return [{ selector: "", properties: { "outline-width": resolved } }];
};
