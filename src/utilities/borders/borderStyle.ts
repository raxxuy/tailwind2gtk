import { wrapChild } from "../../compiler/rule";
import type { StyleRule, UtilityResolverProps } from "../../types";

export const resolveBorderStyle = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(
    /^border-(solid|dashed|dotted|double|hidden|none)$/,
  );
  if (!match) return null;

  return {
    properties: {
      "--tw-border-style": match[1],
      "border-style": match[1],
    },
  };
};

export const resolveDivideStyle = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(
    /^divide-(solid|dashed|dotted|double|hidden|none)$/,
  );
  if (!match) return null;

  return wrapChild("& > :not(:last-child)", {
    "--tw-border-style": match[1],
    "border-style": match[1],
  });
};
