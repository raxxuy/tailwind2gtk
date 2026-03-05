import type { UtilityResult } from "../../core";
import { DROP_SHADOW_SIZES } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateDropShadow = (cls: string): UtilityResult | null => {
  const match = cls.match(/^drop-shadow-(\[.+\]|\(.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return prop([`filter: drop-shadow(0 0 #0000)`]);
  if (DROP_SHADOW_SIZES.has(`drop-shadow-${raw}`)) {
    return prop([`filter: drop-shadow(var(--drop-shadow-${raw}))`]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`filter: drop-shadow(${value})`]);
};
