import type { StyleRule, ResolvedConfig } from "../../types";

const resolveScaleValue = (value: string, negative: boolean): string => {
  const num = Number(value);
  if (!Number.isNaN(num))
    return negative ? `calc(${num / 100} * -1)` : `${num / 100}`;

  if (value.startsWith("(") && value.endsWith(")"))
    return `var(${value.slice(1, -1)})`;

  if (value.startsWith("[") && value.endsWith("]"))
    return value.slice(1, -1).replace(/_/g, " ");

  return value;
};

export const resolveScale = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "scale-none")
    return [
      {
        selector: "",
        properties: { "--scale-x": "1", "--scale-y": "1", "--scale-z": "1" },
      },
    ];

  if (utility === "scale-3d")
    return [
      {
        selector: "",
        properties: {
          "--scale-x": "var(--scale-x)",
          "--scale-y": "var(--scale-y)",
          "--scale-z": "var(--scale-z)",
        },
      },
    ];

  const match = utility.match(/^(-?)scale(?:-(x|y|z))?-(.+)$/);
  if (!match) return null;

  const [, negative, axis, raw] = match;
  const resolved = resolveScaleValue(raw, !!negative);

  if (axis === "x")
    return [
      { selector: "", properties: { "--scale-x": `scaleX(${resolved})` } },
    ];

  if (axis === "y")
    return [
      { selector: "", properties: { "--scale-y": `scaleY(${resolved})` } },
    ];

  if (axis === "z")
    return [
      { selector: "", properties: { "--scale-z": `scaleZ(${resolved})` } },
    ];

  return [
    {
      selector: "",
      properties: {
        "--scale-x": `scaleX(${resolved})`,
        "--scale-y": `scaleY(${resolved})`,
      },
    },
  ];
};
