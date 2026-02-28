import { DIRECTIONS } from "../constants";
import { resolveValue } from "./utils";

export const generatePadding = (cls: string): string[] | null => {
  const match = cls.match(/^p([xytrbl])?-(\[.+\]|\(.+\)|px|[\d.]+)$/);
  if (!match) return null;

  const [, dir = "", raw] = match;
  const value = resolveValue(raw);
  if (!value) return null;

  const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS];
  return parts.map((p) => `padding${p ? `-${p}` : ""}: ${value}`);
};
