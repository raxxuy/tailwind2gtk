import { resolveColor } from "@/resolvers/color";
import type { StyleRule, UtilityResolverProps } from "@/types";

export const resolveCaretColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^caret-(.+)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config);
  if (!resolved) return null;

  return { properties: { "caret-color": resolved } };
};
