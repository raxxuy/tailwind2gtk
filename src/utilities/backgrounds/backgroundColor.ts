import { resolveColor } from "../../helpers/resolveColor";
import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveBackgroundColor = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^bg-(.+)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config);
  if (!resolved) return null;

  return [{ selector: "", properties: { "background-color": resolved } }];
};
