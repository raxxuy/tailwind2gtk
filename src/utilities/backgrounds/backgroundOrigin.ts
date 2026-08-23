import type { StyleRule, UtilityResolverProps } from "../../types";

const ORIGIN_MAP: Record<string, string> = {
  border: "border-box",
  padding: "padding-box",
  content: "content-box",
} as const;

const resolveBackgroundOriginValue = (utility: string): string | null => {
  const match = utility.match(/^bg-origin-(.*)$/);
  if (!match) return null;

  if (match[1] in ORIGIN_MAP) return ORIGIN_MAP[match[1]];

  return null;
};

export const resolveBackgroundOrigin = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveBackgroundOriginValue(utility);
  if (!value) return null;

  return {
    properties: {
      "background-origin": value,
    },
  };
};
