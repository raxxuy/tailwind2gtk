import type { CSSRule, ResolvedConfig } from "../../types";

const resolveTranslateValue = (
  raw: string,
  negative: boolean,
): string | null => {
  const sign = negative ? "-" : "";

  if (raw === "px") return `${sign}1px`;

  if (raw.startsWith("[") && raw.endsWith("]"))
    return `${sign}${raw.slice(1, -1).replace(/_/g, " ")}`;

  if (raw.startsWith("(") && raw.endsWith(")"))
    return negative
      ? `calc(-1 * var(${raw.slice(1, -1)}))`
      : `var(${raw.slice(1, -1)})`;

  const num = Number(raw);
  if (!Number.isNaN(num))
    return `calc(var(--spacing) * ${negative ? -num : num})`;

  return null;
};

export const resolveTranslate = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "translate-none")
    return [
      {
        selector: "",
        properties: {
          "--translate-x": "translateX(0)",
          "--translate-y": "translateY(0)",
          "--translate-z": "translateZ(0)",
        },
      },
    ];

  const match = utility.match(/^(-?)translate(?:-(x|y|z))?-(.+)$/);
  if (!match) return null;

  const [, neg, axis, raw] = match;
  const resolved = resolveTranslateValue(raw, !!neg);
  if (!resolved) return null;

  if (axis === "x")
    return [
      {
        selector: "",
        properties: { "--translate-x": `translateX(${resolved})` },
      },
    ];

  if (axis === "y")
    return [
      {
        selector: "",
        properties: { "--translate-y": `translateY(${resolved})` },
      },
    ];

  if (axis === "z")
    return [
      {
        selector: "",
        properties: { "--translate-z": `translateZ(${resolved})` },
      },
    ];

  return [
    {
      selector: "",
      properties: {
        "--translate-x": `translateX(${resolved})`,
        "--translate-y": `translateY(${resolved})`,
      },
    },
  ];
};
