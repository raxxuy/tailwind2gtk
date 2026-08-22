import { resolveNumber } from "@/resolvers/number";
import { resolveToken } from "@/resolvers/token";
import type { ResolvedConfig, StyleRule, UtilityResolverProps } from "@/types";

const resolveFontSizeValue = (
  utility: string,
  config: ResolvedConfig,
): [string, string] | null => {
  const match = utility.match(/^text-([^/]+)(?:\/(.+))?$/);
  if (!match) return null;

  const [, value, explicitLh] = match;

  const resolved = resolveToken({
    value,
    tokenMap: config.text,
    formatVar: (v) => `var(--text-${v})`,
    extra: "length",
  });

  if (!resolved) return null;

  const lh = explicitLh
    ? resolveNumber(explicitLh, { px: false, fraction: false })
    : value in config.text && config.text[value]["line-height"]
      ? `var(--tw-leading, var(--text-${value}--line-height))`
      : null;

  return [resolved, lh];
};

export const resolveFontSize = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveFontSizeValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "font-size": value[0],
      ...(value[1] ? { "line-height": value[1] } : {}),
    },
  };
};
