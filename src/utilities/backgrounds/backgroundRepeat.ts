import type { StyleRule, UtilityResolverProps } from "@/types";

export const resolveBackgroundRepeat = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(
    /^bg-(repeat|no-repeat|repeat-x|repeat-y|round|space)$/,
  );
  if (!match) return null;

  return {
    properties: {
      "background-repeat": match[1],
    },
  };
};
