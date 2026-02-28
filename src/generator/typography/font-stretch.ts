import { FONT_STRETCH_KEYWORDS } from "../constants";
import { resolveDynamic } from "../utils";

export const generateFontStretch = (cls: string): string[] | null => {
  const match = cls.match(/^font-stretch-(\[.+\]|\(.+\)|[a-z0-9%-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw in FONT_STRETCH_KEYWORDS) {
    return [
      `font-stretch: ${FONT_STRETCH_KEYWORDS[raw as keyof typeof FONT_STRETCH_KEYWORDS]}`,
    ];
  }
  if (raw.endsWith("%")) return [`font-stretch: ${raw}`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`font-stretch: ${value}`];
};
