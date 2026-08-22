import { resolveToken } from "@/resolvers/token";
import type { StyleRule, UtilityResolverProps } from "@/types";

const POSITION_MAP: Record<string, string> = {
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left",
  center: "center",
  "top-left": "top left",
  "top-right": "top right",
  "bottom-left": "bottom left",
  "bottom-right": "bottom right",
} as const;

const resolveBackgroundPositionValue = (utility: string): string | null => {
  const match = utility.match(/^bg-(.*)$/);
  if (!match) return null;

  if (match[1] in POSITION_MAP) return POSITION_MAP[match[1]];

  const positionMatch = utility.match(/^bg-position-(.*)$/);
  if (!positionMatch) return null;

  return resolveToken({
    value: positionMatch[1],
  });
};

export const resolveBackgroundPosition = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveBackgroundPositionValue(utility);
  if (!value) return null;

  return {
    properties: {
      "background-position": value,
    },
  };
};
