import { DIRECTIONS } from "../constants";
import { resolveValue } from "./utils";

export const generateMargin = (cls: string): string[] | null => {
  const match = cls.match(/^(-?)m([xytrbl])?-(\[.+\]|\(.+\)|px|[\d.]+)$/);
  if (!match) return null;

  const [, negative, dir = "", raw] = match;
  const value = resolveValue(raw);
  if (!value) return null;

  const resolved = negative ? `calc(${value} * -1)` : value;
  const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS];
  return parts.map((p) => `margin${p ? `-${p}` : ""}: ${resolved}`);
};
