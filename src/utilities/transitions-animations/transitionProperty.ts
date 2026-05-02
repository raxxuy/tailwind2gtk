import type { CSSRule, ResolvedConfig } from "../../types";

const DEFAULT_TIMING = "var(--default-transition-timing-function)";
const DEFAULT_DURATION = "var(--default-transition-duration)";

const withDefaults = (property: string): Record<string, string> => ({
  "transition-property": property,
  "transition-timing-function": DEFAULT_TIMING,
  "transition-duration": DEFAULT_DURATION,
});

const properties: Record<string, string> = {
  transition:
    "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events",
  "transition-all": "all",
  "transition-colors":
    "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
  "transition-opacity": "opacity",
  "transition-shadow": "box-shadow",
  "transition-transform": "transform, translate, scale, rotate",
};

export const resolveTransitionProperty = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "transition-none")
    return [{ selector: "", properties: { "transition-property": "none" } }];

  if (utility in properties)
    return [{ selector: "", properties: withDefaults(properties[utility]) }];

  const customVar = utility.match(/^transition-\((--[^)]+)\)$/);
  if (customVar)
    return [{ selector: "", properties: withDefaults(`var(${customVar[1]})`) }];

  const arbitrary = utility.match(/^transition-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: withDefaults(arbitrary[1].replace(/_/g, " ")),
      },
    ];

  return null;
};
