import type { UtilityResult } from "../../core";
import { EASE_SIZES } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateTransitionTimingFunction = (
  cls: string,
): UtilityResult | null => {
  const match = cls.match(/^ease-(\[.+\]|\(.+\)|[a-z-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "linear") return prop([`transition-timing-function: linear`]);
  if (raw === "initial") return prop([`transition-timing-function: initial`]);
  if (EASE_SIZES.has(`ease-${raw}`)) {
    return prop([`transition-timing-function: var(--ease-${raw})`]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`transition-timing-function: ${value}`]);
};
