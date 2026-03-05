import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateSaturate = (cls: string): UtilityResult | null => {
  const match = cls.match(/^saturate-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return prop([`filter: saturate(${raw}%)`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`filter: saturate(${value})`]);
};
