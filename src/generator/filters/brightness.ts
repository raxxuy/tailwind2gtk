import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateBrightness = (cls: string): UtilityResult | null => {
  const match = cls.match(/^brightness-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return prop([`filter: brightness(${raw}%)`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`filter: brightness(${value})`]);
};
