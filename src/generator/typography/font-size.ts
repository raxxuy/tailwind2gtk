import type { UtilityResult } from "../../core";
import { TEXT_SIZES } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateFontSize = (cls: string): UtilityResult | null => {
  const match = cls.match(/^text-(\[.+\]|\(length:.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (TEXT_SIZES.has(`text-${raw}`)) {
    return prop([`font-size: var(--text-${raw})`]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`font-size: ${value}`]);
};
