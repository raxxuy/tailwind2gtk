import { resolveToken } from "../../resolvers/token";
import type {
  ResolvedConfig,
  StyleRule,
  UtilityResolverProps,
} from "../../types";

const resolveAnimationValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  if (utility === "animate-none") return "none";

  const match = utility.match(/^animate-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: config.animate,
    formatVar: (v) => `var(--animate-${v})`,
  });
};

export const resolveAnimation = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveAnimationValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      animation: value,
    },
  };
};
