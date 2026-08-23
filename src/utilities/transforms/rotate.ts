import { resolveNumber } from "../../resolvers/number";
import type { StyleRule, UtilityResolverProps } from "../../types";

const resolveRotateValue = (utility: string): string | null => {
  if (utility === "rotate-none") return "none";

  const match = utility.match(/^(-?)rotate-(.*)$/);
  if (!match) return null;

  const [, negative, value] = match;

  return resolveNumber(`${negative}${value}`, {
    fraction: false,
    px: false,
    spacing: false,
    unit: "deg",
  });
};

export const resolveRotate = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveRotateValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-rotate": value,
      transform:
        "var(--tw-translate-x,) var(--tw-translate-y,) var(--tw-scale-x,) var(--tw-scale-y,) var(--tw-rotate,) var(--tw-skew-x,) var(--tw-skew-y,)",
    },
  };
};
