import type { StyleRule, ResolvedConfig } from "../../types";

const positions: Record<string, string> = {
  "top-left": "top left",
  top: "top",
  "top-right": "top right",
  left: "left",
  center: "center",
  right: "right",
  "bottom-left": "bottom left",
  bottom: "bottom",
  "bottom-right": "bottom right",
};

export const resolveBackgroundPosition = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const named = utility.match(
    /^bg-(top-left|top-right|top|bottom-left|bottom-right|bottom|left|center|right)$/,
  );
  if (named && named[1] in positions)
    return [
      {
        selector: "",
        properties: { "background-position": positions[named[1]] },
      },
    ];

  const customVar = utility.match(/^bg-position-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "background-position": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^bg-position-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "background-position": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};
