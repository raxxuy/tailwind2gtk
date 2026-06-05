import type { CSSRule, ResolvedConfig } from "../../types";

const clips: Record<string, string> = {
  border: "border-box",
  padding: "padding-box",
  content: "content-box",
};

export const resolveBackgroundClip = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const named = utility.match(/^bg-clip-([\w-]+)$/);
  if (named && named[1] in clips)
    return [
      {
        selector: "",
        properties: { "background-clip": clips[named[1]] },
      },
    ];

  return null;
};
