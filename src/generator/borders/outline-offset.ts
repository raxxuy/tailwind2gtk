import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateOutlineOffset = (cls: string): UtilityResult | null => {
  const match = cls.match(/^(-?)outline-offset-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, negative, raw] = match;

  if (raw.match(/^[\d.]+$/)) {
    return prop([
      `outline-offset: ${negative ? `calc(${raw}px * -1)` : `${raw}px`}`,
    ]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`outline-offset: ${negative ? `calc(${value} * -1)` : value}`]);
};
