import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateOpacity = (cls: string): UtilityResult | null => {
  const match = cls.match(/^opacity-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return prop([`opacity: ${raw}%`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`opacity: ${value}`]);
};
