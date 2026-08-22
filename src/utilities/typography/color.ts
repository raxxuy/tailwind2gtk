import { resolveColor } from "@/resolvers/color";
import type { StyleRule, UtilityResolverProps } from "@/types";

export const resolveTextColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^text-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config);
  if (!resolved) return null;

  return {
    properties: { color: resolved },
  };
};
