import type { StyleRule, ResolvedConfig } from "../../types";

const sides: Record<string, string[]> = {
  "": ["border-radius"],
  t: ["border-top-left-radius", "border-top-right-radius"],
  r: ["border-top-right-radius", "border-bottom-right-radius"],
  b: ["border-bottom-right-radius", "border-bottom-left-radius"],
  l: ["border-top-left-radius", "border-bottom-left-radius"],
  tl: ["border-top-left-radius"],
  tr: ["border-top-right-radius"],
  br: ["border-bottom-right-radius"],
  bl: ["border-bottom-left-radius"],
};

const resolveRadiusValue = (
  value: string,
  config: ResolvedConfig,
): string | null => {
  if (value === "none") return "0";
  if (value === "full") return "9999px";

  if (value in config.borderRadii) return `var(--radius-${value})`;

  if (value.startsWith("(") && value.endsWith(")"))
    return `var(${value.slice(1, -1)})`;

  if (value.startsWith("[") && value.endsWith("]"))
    return value.slice(1, -1).replace(/_/g, " ");

  return null;
};

export const resolveBorderRadius = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^rounded(?:-(tl|tr|br|bl|t|r|b|l))?(?:-(.+))?$/);
  if (!match) return null;

  const side = match[1] ?? "";
  const value = match[2] ?? "";
  const props = sides[side];
  if (!props) return null;

  const resolved = resolveRadiusValue(value, config);
  if (!resolved) return null;

  return [
    {
      selector: "",
      properties: Object.fromEntries(props.map((p) => [p, resolved])),
    },
  ];
};
