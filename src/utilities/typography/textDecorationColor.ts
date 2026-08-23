import { resolveColor } from "../../resolvers/color";
import type { StyleRule, UtilityResolverProps } from "../../types";

export const resolveTextDecorationColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^decoration-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config);
  if (!resolved) return null;

  return {
    properties: { "text-decoration-color": resolved },
  };
};
