import type { UtilityResult } from "../../core";
import { TEXT_SHADOW_SIZES } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateTextShadow = (cls: string): UtilityResult | null => {
  const match = cls.match(/^text-shadow-(\[.+\]|\(.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return prop([`text-shadow: none`]);
  if (TEXT_SHADOW_SIZES.has(`text-shadow-${raw}`)) {
    return prop([`text-shadow: var(--text-shadow-${raw})`]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`text-shadow: ${value}`]);
};
