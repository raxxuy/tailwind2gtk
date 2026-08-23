import { resolveToken } from "../../resolvers/token";
import type {
  ResolvedConfig,
  StyleRule,
  UtilityResolverProps,
} from "../../types";

const resolveFontWeightValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  const match = utility.match(/^font-(.+)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: config["font-weight"],
    formatVar: (v) => `var(--font-weight-${v})`,
  });
};

export const resolveFontWeight = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveFontWeightValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "--tw-font-weight": value,
      "font-weight": value,
    },
  };
};
