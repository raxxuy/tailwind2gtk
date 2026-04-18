import type { UtilityResult } from "../../core";
import { ORIGIN_KEYWORDS } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateTransformOrigin = (cls: string): UtilityResult | null => {
  const match = cls.match(/^origin-(\[.+\]|\(.+\)|[a-z-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw in ORIGIN_KEYWORDS) {
    return prop([`transform-origin: ${ORIGIN_KEYWORDS[raw]}`]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`transform-origin: ${value}`]);
};
