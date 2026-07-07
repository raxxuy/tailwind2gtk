import type { StyleRule, ResolvedConfig } from "../../types";

const origins: Record<string, string> = {
  border: "border-box",
  padding: "padding-box",
  content: "content-box",
};

export const resolveBackgroundOrigin = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const named = utility.match(/^bg-origin-([\w-]+)$/);
  if (named && named[1] in origins)
    return [
      {
        selector: "",
        properties: { "background-origin": origins[named[1]] },
      },
    ];

  return null;
};
