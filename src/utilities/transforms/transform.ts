import { resolveToken } from "@/resolvers/token";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveTransformValue = (utility: string): string | null => {
  if (utility === "transform-none") return "none";

  if (
    utility === "transform" ||
    utility === "transform-cpu" ||
    utility === "transform-gpu"
  ) {
    return "var(--tw-translate-x,) var(--tw-translate-y,) var(--tw-scale-x,) var(--tw-scale-y,) var(--tw-rotate,) var(--tw-skew-x,) var(--tw-skew-y,)";
  }

  const match = utility.match(/^transform-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
  });
};

export const resolveTransform = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveTransformValue(utility);
  if (!value) return null;

  return {
    properties: {
      transform: value,
    },
  };
};
