import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateFontFeatureSettings = (
  cls: string,
): UtilityResult | null => {
  const match = cls.match(/^font-features-(\[.+\]|\(.+\))$/);
  if (!match) return null;

  const [, raw] = match;

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`font-feature-settings: ${value}`]);
};
