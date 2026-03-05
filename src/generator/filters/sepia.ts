import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateSepia = (cls: string): UtilityResult | null => {
  if (cls === "sepia") return prop([`filter: sepia(100%)`]);

  const match = cls.match(/^sepia-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return prop([`filter: sepia(${raw}%)`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`filter: sepia(${value})`]);
};
