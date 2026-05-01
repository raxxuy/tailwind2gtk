import { resolveValue } from "../../helpers/resolveValue";
import type { CSSRule } from "../../types";

export const resolveMinHeight = (utility: string): CSSRule[] | null => {
  const match = utility.match(/^min-h-(.+)$/);
  if (!match) return null;

  const [, value] = match;
  const resolved = resolveValue(value);
  if (!resolved) return null;

  return [{ selector: "", properties: { "min-height": resolved } }];
};
