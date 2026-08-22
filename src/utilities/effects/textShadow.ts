import {
  injectColorVar,
  parseAlphaSuffix,
  resolveColor,
} from "@/resolvers/color";
import { resolveToken } from "@/resolvers/token";
import type { ResolvedConfig, StyleRule, UtilityResolverProps } from "@/types";

const resolveTextShadowValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  if (utility === "text-shadow-none") return "none";

  const { base, alpha } = parseAlphaSuffix(utility);

  const match = base.match(/^text-shadow-(.+)$/);
  if (!match) return null;
  const [, value] = match;

  return resolveToken({
    value,
    tokenMap: config["text-shadow"],
    formatVar: (v) =>
      injectColorVar(
        config["text-shadow"][v],
        "--tw-text-shadow-color",
        alpha ?? undefined,
      ),
  });
};

export const resolveTextShadow = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveTextShadowValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "text-shadow": value,
    },
  };
};

export const resolveTextShadowColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^text-shadow-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config, "color");
  if (!resolved) return null;

  return {
    properties: {
      "--tw-text-shadow-color": resolved,
    },
  };
};
