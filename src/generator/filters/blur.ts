import type { UtilityResult } from "../../core";
import { BLUR_SIZES } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateBlur = (cls: string): UtilityResult | null => {
  const match = cls.match(/^blur-(\[.+\]|\(.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return prop([`filter: `]);
  if (BLUR_SIZES.has(`blur-${raw}`)) {
    return prop([`filter: blur(var(--blur-${raw}))`]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`filter: blur(${value})`]);
};
