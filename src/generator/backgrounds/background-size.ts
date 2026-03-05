import type { UtilityResult } from "../../core";
import { BACKGROUND_SIZE_KEYWORDS } from "../constants";
import { prop, resolveDynamic } from "../utils";

export const generateBackgroundSize = (cls: string): UtilityResult | null => {
  if (cls in BACKGROUND_SIZE_KEYWORDS) {
    return prop([
      `background-size: ${BACKGROUND_SIZE_KEYWORDS[cls as keyof typeof BACKGROUND_SIZE_KEYWORDS]}`,
    ]);
  }

  const match = cls.match(/^bg-size-(\[.+\]|\(.+\))$/);
  if (!match) return null;

  const value = resolveDynamic(match[1]);
  if (!value) return null;

  return prop([`background-size: ${value}`]);
};
