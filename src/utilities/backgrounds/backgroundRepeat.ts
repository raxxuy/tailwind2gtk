import type { CSSRule, ResolvedConfig } from "../../types";

const repeats: Record<string, string> = {
  repeat: "repeat",
  "repeat-x": "repeat-x",
  "repeat-y": "repeat-y",
  round: "round",
  space: "space",
  "no-repeat": "no-repeat",
};

export const resolveBackgroundRepeat = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const named = utility.match(
    /^bg-(repeat|no-repeat|repeat-x|repeat-y|round|space)$/,
  );
  if (named && named[1] in repeats)
    return [
      { selector: "", properties: { "background-repeat": repeats[named[1]] } },
    ];

  return null;
};
