import type { UtilityResult } from "../../core";
import { ANIMATE_SIZES } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateAnimation = (cls: string): UtilityResult | null => {
  const match = cls.match(/^animate-(\[.+\]|\(.+\)|[a-z-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return prop([`animation: none`]);
  if (ANIMATE_SIZES.has(`animate-${raw}`)) {
    return prop([`animation: var(--animate-${raw})`]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`animation: ${value}`]);
};
