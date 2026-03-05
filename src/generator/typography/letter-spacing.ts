import type { UtilityResult } from "../../core";
import { TRACKING_SIZES } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateLetterSpacing = (cls: string): UtilityResult | null => {
  const match = cls.match(/^tracking-(\[.+\]|\(.+\)|[a-z-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (TRACKING_SIZES.has(`tracking-${raw}`)) {
    return prop([`letter-spacing: var(--tracking-${raw})`]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`letter-spacing: ${value}`]);
};
