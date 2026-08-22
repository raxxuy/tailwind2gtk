import type { StyleRule, UtilityResolverProps } from "@/types";

const CLIP_MAP: Record<string, string> = {
  border: "border-box",
  padding: "padding-box",
  content: "content-box",
} as const;

const resolveBackgroundClipValue = (utility: string): string | null => {
  const match = utility.match(/^bg-clip-(.*)$/);
  if (!match) return null;

  if (match[1] in CLIP_MAP) return CLIP_MAP[match[1]];

  return null;
};

export const resolveBackgroundClip = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveBackgroundClipValue(utility);
  if (!value) return null;

  return {
    properties: {
      "background-clip": value,
    },
  };
};
