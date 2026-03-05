import type { UtilityResult } from "../../core";
import { DIRECTIONS } from "../constants";
import { prop } from "../utils";
import { resolveValue } from "./utils";

export const generatePadding = (cls: string): UtilityResult | null => {
  const match = cls.match(/^p([xytrbl])?-(\[.+\]|\(.+\)|px|[\d.]+)$/);
  if (!match) return null;

  const [, dir = "", raw] = match;
  const value = resolveValue(raw);
  if (!value) return null;

  const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS];
  return prop(parts.map((p) => `padding${p ? `-${p}` : ""}: ${value}`));
};
