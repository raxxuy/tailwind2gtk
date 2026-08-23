import type { StyleRule, UtilityResolverProps } from "../../types";

const BEHAVIOR_MAP: Record<string, string> = {
  normal: "normal",
  discrete: "allow-discrete",
} as const;

export const resolveTransitionBehavior = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^transition-(.*)$/);
  if (!match) return null;

  const [, value] = match;

  if (value in BEHAVIOR_MAP) {
    return {
      properties: {
        "transition-behavior": BEHAVIOR_MAP[value],
      },
    };
  }

  return null;
};
