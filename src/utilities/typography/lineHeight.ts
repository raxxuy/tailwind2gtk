import { resolveNumber } from "../../resolvers/number";
import type {
  ResolvedConfig,
  StyleRule,
  UtilityResolverProps,
} from "../../types";

const resolveLineHeightValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  if (utility === "leading-none") return "1";

  const match = utility.match(/^leading-(.*)$/);
  if (!match) return null;

  const [, value] = match;

  if (value in config.leading) return `var(--leading-${value})`;

  return resolveNumber(value, { fraction: false });
};

export const resolveLineHeight = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveLineHeightValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "--tw-leading": value,
      "line-height": value,
    },
  };
};
