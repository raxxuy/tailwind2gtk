import type { CSSRule, ResolvedConfig } from "../../types";

const transforms: Record<string, string> = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  "normal-case": "none",
};

export const resolveTextTransforms = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const named = utility.match(/^decoration-([\w-]+)$/);
  if (named && named[1] in transforms)
    return [
      {
        selector: "",
        properties: { "text-transform": transforms[named[1]] },
      },
    ];

  return null;
};
