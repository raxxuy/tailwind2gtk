import type { CSSRule, ResolvedConfig } from "../../types";

const TRANSFORM_CPU =
  "var(--rotate) var(--rotate-x) var(--rotate-y) var(--rotate-z) var(--scale-x) var(--scale-y) var(--scale-z) var(--skew-x) var(--skew-y) var(--translate-x) var(--translate-y) var(--translate-z)";
const TRANSFORM_GPU = `translateZ(0) ${TRANSFORM_CPU}`;

export const resolveTransform = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "transform-none")
    return [{ selector: "", properties: { transform: "none" } }];

  if (utility === "transform-cpu")
    return [{ selector: "", properties: { transform: TRANSFORM_CPU } }];

  if (utility === "transform-gpu")
    return [{ selector: "", properties: { transform: TRANSFORM_GPU } }];

  const customVar = utility.match(/^transform-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { transform: `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^transform-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { transform: arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};
