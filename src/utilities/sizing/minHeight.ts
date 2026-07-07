import { resolveValue } from "../../helpers/resolveValue";
import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveMinHeight = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^min-h-(.+)$/);
  if (!match) return null;

  const [, value] = match;
  const resolved = resolveValue(value);
  if (!resolved) return null;

  return [{ selector: "", properties: { "min-height": resolved } }];
};
