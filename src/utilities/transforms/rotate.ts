import type { StyleRule, ResolvedConfig } from "../../types";

const resolveRotateValue = (value: string, negative: boolean): string => {
  const num = Number(value);
  if (!Number.isNaN(num))
    return negative ? `calc(${num}deg * -1)` : `${num}deg`;

  if (value.startsWith("(") && value.endsWith(")"))
    return `var(${value.slice(1, -1)})`;

  if (value.startsWith("[") && value.endsWith("]"))
    return value.slice(1, -1).replace(/_/g, " ");

  return value;
};

export const resolveRotate = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "rotate-none")
    return [{ selector: "", properties: { "--rotate": "rotate(0deg)" } }];

  const match = utility.match(/^(-?)rotate(?:-(x|y|z))?-(.+)$/);
  if (!match) return null;

  const [, negative, axis, raw] = match;
  const resolved = resolveRotateValue(raw, !!negative);

  if (axis === "x")
    return [
      { selector: "", properties: { "--rotate-x": `rotateX(${resolved})` } },
    ];

  if (axis === "y")
    return [
      { selector: "", properties: { "--rotate-y": `rotateY(${resolved})` } },
    ];

  if (axis === "z")
    return [
      { selector: "", properties: { "--rotate-z": `rotateZ(${resolved})` } },
    ];

  return [{ selector: "", properties: { "--rotate": `rotate(${resolved})` } }];
};
