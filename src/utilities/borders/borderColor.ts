import { wrapChild } from "@/compiler/rule";
import { resolveColor } from "@/resolvers/color";
import { resolveSidedProperty } from "@/resolvers/sided";
import type { StyleRule, UtilityResolverProps } from "@/types";

const COLOR_PROPERTY_MAP: Record<string, string[]> = {
  border: ["border-color"],
  "border-x": ["border-left-color", "border-right-color"],
  "border-y": ["border-top-color", "border-bottom-color"],
  "border-t": ["border-top-color"],
  "border-r": ["border-right-color"],
  "border-b": ["border-bottom-color"],
  "border-l": ["border-left-color"],
} as const;

export const resolveBorderColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const properties = resolveSidedProperty({
    utility,
    sideMap: COLOR_PROPERTY_MAP,
    resolveValue: (v) => resolveColor(v, config),
  });
  return properties ? { properties } : null;
};

export const resolveDivideColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^divide-(.+)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config);
  if (!resolved) return null;

  return wrapChild("& > :not(:last-child)", {
    "border-color": resolved,
  });
};
