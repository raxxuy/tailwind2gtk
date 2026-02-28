import { FONT_WEIGHTS } from "../constants";
import { resolveDynamic } from "../utils";

export const generateFontWeight = (cls: string): string[] | null => {
  const match = cls.match(/^font-(\[.+\]|\(.+\)|[a-z]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw in FONT_WEIGHTS) return [`font-weight: ${FONT_WEIGHTS[raw]}`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`font-weight: ${value}`];
};
