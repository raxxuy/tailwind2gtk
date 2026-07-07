import type { StyleRule, ResolvedConfig } from "../../types";

const resolveSkewValue = (value: string, negative: boolean): string => {
  const num = Number(value);
  if (!Number.isNaN(num)) return `${negative ? -num : num}deg`;

  if (value.startsWith("(") && value.endsWith(")"))
    return `var(${value.slice(1, -1)})`;

  if (value.startsWith("[") && value.endsWith("]"))
    return value.slice(1, -1).replace(/_/g, " ");

  return value;
};

export const resolveSkew = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^(-?)skew(?:-(x|y))?-(.+)$/);
  if (!match) return null;

  const [, negative, axis, raw] = match;
  const resolved = resolveSkewValue(raw, !!negative);

  if (axis === "x")
    return [{ selector: "", properties: { "--skew-x": `skewX(${resolved})` } }];

  if (axis === "y")
    return [{ selector: "", properties: { "--skew-y": `skewY(${resolved})` } }];

  // no axis — set both
  return [
    {
      selector: "",
      properties: {
        "--skew-x": `skewX(${resolved})`,
        "--skew-y": `skewY(${resolved})`,
      },
    },
  ];
};
