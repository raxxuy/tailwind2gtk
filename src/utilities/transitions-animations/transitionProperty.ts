import { resolveToken } from "@/resolvers/token";
import type { StyleRule, UtilityResolverProps } from "@/types";

const PROPERTY_MAP: Record<string, string> = {
  all: "all",
  colors:
    "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform, translate, scale, rotate",
  none: "none",
} as const;

const resolveTransitionPropertyValue = (utility: string): string | null => {
  if (utility === "transition") {
    return "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events";
  }

  const match = utility.match(/^transition-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: PROPERTY_MAP,
    formatVar: (v) => PROPERTY_MAP[v],
  });
};

export const resolveTransitionProperty = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveTransitionPropertyValue(utility);
  if (!value) return null;

  if (value === "none") {
    return {
      properties: {
        "transition-property": value,
      },
    };
  }

  return {
    properties: {
      "transition-property": value,
      "transition-timing-function": "var(--default-transition-timing-function)",
      "transition-duration": "var(--default-transition-duration)",
    },
  };
};
