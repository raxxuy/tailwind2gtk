import { resolveValue } from "../../helpers/resolveValue";
import type { CSSRule } from "../../types";

export const resolveMargin = (utility: string): CSSRule[] | null => {
  const match = utility.match(/^(-?)(m|mx|my|mt|mr|mb|ml)-(.+)$/);
  if (!match) return null;

  const [, negative, prefix, value] = match;
  const resolved = resolveValue(`${negative}${value}`);
  if (!resolved) return null;

  const properties: Record<string, string> = (() => {
    switch (prefix) {
      case "m":
        return { margin: resolved };
      case "mx":
        return { "margin-left": resolved, "margin-right": resolved };
      case "my":
        return { "margin-top": resolved, "margin-bottom": resolved };
      case "mt":
        return { "margin-top": resolved };
      case "mr":
        return { "margin-right": resolved };
      case "mb":
        return { "margin-bottom": resolved };
      case "ml":
        return { "margin-left": resolved };
      default:
        return {};
    }
  })();

  return [{ selector: "", properties }];
};

export const resolveSpace = (utility: string): CSSRule[] | null => {
  if (utility === "space-x-reverse")
    return [
      {
        selector: "",
        properties: {},
        children: [
          {
            selector: "& > :not(:last-child)",
            properties: { "--space-x-reverse": "1" },
          },
        ],
      },
    ];

  if (utility === "space-y-reverse")
    return [
      {
        selector: "",
        properties: {},
        children: [
          {
            selector: "& > :not(:last-child)",
            properties: { "--space-y-reverse": "1" },
          },
        ],
      },
    ];

  const match = utility.match(/^(-?)space-(x|y)-(.+)$/);
  if (!match) return null;

  const [, negative, axis, value] = match;
  const resolved = resolveValue(`${negative}${value}`);
  if (!resolved) return null;

  const properties: Record<string, string> =
    axis === "x"
      ? {
          "--space-x-reverse": "0",
          "margin-left": `calc(${resolved} * var(--space-x-reverse))`,
          "margin-right": `calc(${resolved} * calc(1 - var(--space-x-reverse)))`,
        }
      : {
          "--space-y-reverse": "0",
          "margin-block-start": `calc(${resolved} * var(--space-y-reverse))`,
          "margin-block-end": `calc(${resolved} * calc(1 - var(--space-y-reverse)))`,
        };

  return [
    {
      selector: "",
      properties: {},
      children: [{ selector: "& > :not(:last-child)", properties }],
    },
  ];
};
