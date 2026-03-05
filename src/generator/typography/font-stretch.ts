import type { UtilityResult } from "../../core";
import { FONT_STRETCH_KEYWORDS } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateFontStretch = (cls: string): UtilityResult | null => {
  const match = cls.match(/^font-stretch-(\[.+\]|\(.+\)|[a-z0-9%-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw in FONT_STRETCH_KEYWORDS) {
    return prop([
      `font-stretch: ${FONT_STRETCH_KEYWORDS[raw as keyof typeof FONT_STRETCH_KEYWORDS]}`,
    ]);
  }
  if (raw.endsWith("%")) return prop([`font-stretch: ${raw}`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`font-stretch: ${value}`]);
};
