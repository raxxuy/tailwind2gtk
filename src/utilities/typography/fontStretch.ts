import { resolveToken } from "../../resolvers/token";
import type { StyleRule, UtilityResolverProps } from "../../types";

const STRETCH_SET = new Set([
  "ultra-condensed",
  "extra-condensed",
  "condensed",
  "semi-condensed",
  "normal",
  "semi-expanded",
  "expanded",
  "extra-expanded",
  "ultra-expanded",
]);

const resolveFontStretchValue = (utility: string): string | null => {
  const match = utility.match(/^font-stretch-(.*)$/);
  if (!match) return null;

  const [, value] = match;

  if (STRETCH_SET.has(value)) return value;
  if (/^\d+%$/.test(value)) return value;

  return resolveToken({ value });
};

export const resolveFontStretch = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveFontStretchValue(utility);
  if (!value) return null;

  return {
    properties: {
      "font-stretch": value,
    },
  };
};
