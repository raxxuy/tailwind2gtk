import { wrapChild } from "@/compiler/rule";
import { getTailwindVariable } from "@/compiler/runtime/variables";
import { resolveNumber } from "@/resolvers/number";
import { resolveSidedProperty } from "@/resolvers/sided";
import type { StyleRule, UtilityResolverProps } from "@/types";

const WIDTH_PROPERTY_MAP: Record<string, string[]> = {
  border: ["border-width"],
  "border-x": ["border-left-width", "border-right-width"],
  "border-y": ["border-top-width", "border-bottom-width"],
  "border-t": ["border-top-width"],
  "border-r": ["border-right-width"],
  "border-b": ["border-bottom-width"],
  "border-l": ["border-left-width"],
} as const;

const STYLE_PROPERTY_MAP: Record<string, string[]> = {
  border: ["border-style"],
  "border-x": ["border-left-style", "border-right-style"],
  "border-y": ["border-top-style", "border-bottom-style"],
  "border-t": ["border-top-style"],
  "border-r": ["border-right-style"],
  "border-b": ["border-bottom-style"],
  "border-l": ["border-left-style"],
} as const;

const resolveWidthValue = (value: string): string | null => {
  if (!value) return "1px";
  return resolveNumber(value, {
    px: false,
    spacing: false,
    fraction: false,
    extra: "length",
  });
};

export const resolveBorderWidth = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const width = resolveSidedProperty({
    utility,
    sideMap: WIDTH_PROPERTY_MAP,
    resolveValue: resolveWidthValue,
    allowBare: true,
  });
  if (!width) return null;

  const style = resolveSidedProperty({
    utility,
    sideMap: STYLE_PROPERTY_MAP,
    resolveValue: () => "var(--tw-border-style)",
    allowBare: true,
  });
  if (!style) return null;

  return { properties: { ...width, ...style } };
};

export const resolveDivide = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^divide-(x|y)(?:-(reverse|.+))?$/);
  if (!match) return null;

  const [, axis, value = ""] = match;

  const reverseVar = getTailwindVariable(`divide-${axis}`);
  if (!reverseVar) return null;

  if (value === "reverse") {
    return wrapChild("& > :not(:last-child)", { [reverseVar]: "1" });
  }

  const resolved = resolveWidthValue(value);
  if (!resolved) return null;

  const [styleStart, styleEnd] = STYLE_PROPERTY_MAP[`border-${axis}`];
  const [start, end] = WIDTH_PROPERTY_MAP[`border-${axis}`];

  return wrapChild("& > :not(:last-child)", {
    [reverseVar]: "0",
    [styleStart]: "var(--tw-border-style)",
    [styleEnd]: "var(--tw-border-style)",
    [start]: `calc(${resolved} * var(${reverseVar}))`,
    [end]: `calc(${resolved} * calc(1 - var(${reverseVar})))`,
  });
};
