import type { StyleRule, ResolvedConfig } from "../../types";

const sizes: Record<string, string> = {
  auto: "auto",
  cover: "cover",
  contain: "contain",
};

export const resolveBackgroundSize = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const named = utility.match(/^bg-(auto|cover|contain)$/);
  if (named)
    return [
      { selector: "", properties: { "background-size": sizes[named[1]] } },
    ];

  const customVar = utility.match(/^bg-size-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "background-size": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^bg-size-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "background-size": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};
