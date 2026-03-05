import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateInvert = (cls: string): UtilityResult | null => {
  if (cls === "invert") return prop([`filter: invert(100%)`]);

  const match = cls.match(/^invert-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return prop([`filter: invert(${raw}%)`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`filter: invert(${value})`]);
};
