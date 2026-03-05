import type { UtilityResult } from "../../core";
import { FONT_WEIGHTS } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateFontWeight = (cls: string): UtilityResult | null => {
  const match = cls.match(/^font-(\[.+\]|\(.+\)|[a-z]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw in FONT_WEIGHTS) return prop([`font-weight: ${FONT_WEIGHTS[raw]}`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`font-weight: ${value}`]);
};
