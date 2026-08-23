import { resolveNumber } from "../../resolvers/number";
import type { StyleRule, UtilityResolverProps } from "../../types";

const resolveWidthValue = (value: string): string | null => {
  if (!value) return "1px";
  return resolveNumber(value, {
    px: false,
    spacing: false,
    fraction: false,
    extra: "length",
  });
};

export const resolveOutlineWidth = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^outline-(.+)$/);
  if (!match) return null;

  const resolved = resolveWidthValue(match[1]);
  if (!resolved) return null;

  return {
    properties: {
      "outline-style": "var(--tw-outline-style)",
      "outline-width": resolved,
    },
  };
};
