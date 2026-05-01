import type { CSSRule, ResolvedConfig } from "../../types";

const sides: Record<string, string[]> = {
  "": ["border-width"],
  x: ["border-left-width", "border-right-width"],
  y: ["border-top-width", "border-bottom-width"],
  t: ["border-top-width"],
  r: ["border-right-width"],
  b: ["border-bottom-width"],
  l: ["border-left-width"],
};

const resolveBorderValue = (value: string | undefined): string | null => {
  if (!value) return "1px";

  const num = Number(value);
  if (!Number.isNaN(num)) return `${num}px`;

  if (value.startsWith("(length:") && value.endsWith(")"))
    return `var(${value.slice(8, -1)})`;

  if (value.startsWith("[") && value.endsWith("]"))
    return value.slice(1, -1).replace(/_/g, " ");

  return null;
};

export const resolveBorderWidth = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const match = utility.match(/^border(?:-(x|y|t|r|b|l))?(?:-(.+))?$/);
  if (!match) return null;

  const side = match[1] ?? "";
  const props = sides[side];
  if (!props) return null;

  const resolved = resolveBorderValue(match[2]);
  if (!resolved) return null;

  return [
    {
      selector: "",
      properties: Object.fromEntries(props.map((p) => [p, resolved])),
    },
  ];
};

export const resolveDivide = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "divide-x-reverse")
    return [
      {
        selector: "",
        properties: {},
        children: [
          {
            selector: "& > :not(:last-child)",
            properties: { "--divide-x-reverse": "1" },
          },
        ],
      },
    ];

  if (utility === "divide-y-reverse")
    return [
      {
        selector: "",
        properties: {},
        children: [
          {
            selector: "& > :not(:last-child)",
            properties: { "--divide-y-reverse": "1" },
          },
        ],
      },
    ];

  const match = utility.match(/^divide-(x|y)(?:-(.+))?$/);
  if (!match) return null;

  const resolved = resolveBorderValue(match[2]);
  if (!resolved) return null;

  const properties: Record<string, string> =
    match[1] === "x"
      ? { "border-left-width": "0px", "border-right-width": resolved }
      : { "border-top-width": "0px", "border-bottom-width": resolved };

  return [
    {
      selector: "",
      properties: {},
      children: [{ selector: "& > :not(:last-child)", properties }],
    },
  ];
};
