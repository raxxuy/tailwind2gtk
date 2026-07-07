import { resolveColor } from "../../helpers/resolveColor";
import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveTextDecorationColor = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^decoration-(.+)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config);
  if (!resolved) return null;

  return [{ selector: "", properties: { "text-decoration-color": resolved } }];
};
