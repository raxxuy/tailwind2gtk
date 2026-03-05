import type { UtilityResult } from "../../core";
import { CHILD_SELECTOR, DIRECTIONS } from "../constants";
import { prop, propWithSelector } from "../utils";
import { resolveValue } from "./utils";

export const generateMargin = (cls: string): UtilityResult | null => {
  const match = cls.match(/^(-?)m([xytrbl])?-(\[.+\]|\(.+\)|px|[\d.]+)$/);
  if (!match) return null;

  const [, negative, dir = "", raw] = match;
  const value = resolveValue(raw);
  if (!value) return null;

  const resolved = negative ? `calc(${value} * -1)` : value;
  const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS];
  return prop(parts.map((p) => `margin${p ? `-${p}` : ""}: ${resolved}`));
};

export const generateSpace = (cls: string): UtilityResult | null => {
  const reverseMatch = cls.match(/^space-([xy])-reverse$/);
  if (reverseMatch) {
    const axis = reverseMatch[1];
    return prop([
      axis === "x" ? "--tw-space-x-reverse: 1" : "--tw-space-y-reverse: 1",
    ]);
  }

  const match = cls.match(/^(-?)space-([xy])-(\[.+\]|\(.+\)|px|[\d.]+)$/);
  if (!match) return null;

  const [, negative, axis, raw] = match;
  const value = resolveValue(raw);
  if (!value) return null;

  const resolved = negative ? `calc(${value} * -1)` : value;

  return propWithSelector(
    CHILD_SELECTOR,
    axis === "x"
      ? [
          "--tw-space-x-reverse: 0",
          `margin-left: calc(${resolved} * var(--tw-space-x-reverse))`,
          `margin-right: calc(${resolved} * calc(1 - var(--tw-space-x-reverse)))`,
        ]
      : [
          "--tw-space-y-reverse: 0",
          `margin-top: calc(${resolved} * var(--tw-space-y-reverse))`,
          `margin-bottom: calc(${resolved} * calc(1 - var(--tw-space-y-reverse)))`,
        ],
  );
};
