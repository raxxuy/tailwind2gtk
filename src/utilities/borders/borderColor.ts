import { resolveColor } from "../../helpers/resolveColor";
import type { StyleRule, ResolvedConfig } from "../../types";

const sides: Record<string, string[]> = {
  "": ["border-color"],
  x: ["border-left-color", "border-right-color"],
  y: ["border-top-color", "border-bottom-color"],
  t: ["border-top-color"],
  r: ["border-right-color"],
  b: ["border-bottom-color"],
  l: ["border-left-color"],
};

export const resolveBorderColor = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^border(?:-(x|y|t|r|b|l))?-(.+)$/);
  if (!match) return null;

  const side = match[1] ?? "";
  const props = sides[side];
  if (!props) return null;

  const resolved = resolveColor(match[2], config);
  if (!resolved) return null;

  return [
    {
      selector: "",
      properties: Object.fromEntries(props.map((p) => [p, resolved])),
    },
  ];
};

export const resolveDivideColor = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^divide-(.+)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config);
  if (!resolved) return null;

  return [
    {
      selector: "",
      properties: {},
      children: [
        {
          selector: "& > :not(:last-child)",
          properties: { "border-color": resolved },
        },
      ],
    },
  ];
};
