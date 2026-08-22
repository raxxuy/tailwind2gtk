import { wrapChild } from "@/compiler/rule";
import { getTailwindVariable } from "@/compiler/runtime/variables";
import { resolveNumber } from "@/resolvers/number";
import { resolveSidedProperty } from "@/resolvers/sided";
import type { StyleRule, UtilityResolverProps } from "@/types/core";

const MARGIN_PROPERTY_MAP: Record<string, string[]> = {
  m: ["margin"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  mt: ["margin-top"],
  mr: ["margin-right"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
} as const;

export const resolveMargin = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const properties = resolveSidedProperty({
    utility,
    sideMap: MARGIN_PROPERTY_MAP,
    resolveValue: (v) => resolveNumber(v, { fraction: false }),
    allowNegative: true,
  });
  return properties ? { properties } : null;
};

export const resolveSpace = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^(-?)space-(x|y)-(reverse|.+)$/);
  if (!match) return null;

  const [, negative, axis, value] = match;

  const reverseVar = getTailwindVariable(`space-${axis}`);
  if (!reverseVar) return null;

  if (value === "reverse") {
    return wrapChild("& > :not(:last-child)", { [reverseVar]: "1" });
  }

  const resolved = resolveNumber(`${negative}${value}`, { fraction: false });
  if (!resolved) return null;

  const [start, end] = MARGIN_PROPERTY_MAP[`m${axis}`];

  return wrapChild("& > :not(:last-child)", {
    [reverseVar]: "0",
    [start]: `calc(${resolved} * var(${reverseVar}))`,
    [end]: `calc(${resolved} * calc(1 - var(${reverseVar})))`,
  });
};
