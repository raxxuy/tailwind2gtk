import type { StyleRule, ResolvedConfig } from "../../types";

const transforms: Record<string, string> = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  "normal-case": "none",
};

export const resolveTextTransforms = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility in transforms)
    return [
      {
        selector: "",
        properties: { "text-transform": transforms[utility] },
      },
    ];

  return null;
};
