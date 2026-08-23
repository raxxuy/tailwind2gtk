import { resolveToken } from "../../resolvers/token";
import type { StyleRule, UtilityResolverProps } from "../../types";

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

const resolveTransformOriginValue = (utility: string): string | null => {
  const match = utility.match(/^origin-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: POSITION_MAP,
    formatVar: (v) => POSITION_MAP[v],
  });
};

export const resolveTransformOrigin = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveTransformOriginValue(utility);
  if (!value) return null;

  return {
    properties: {
      "transform-origin": value,
    },
  };
};
