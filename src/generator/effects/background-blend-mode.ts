import type { UtilityResult } from "../../core";
import { BACKGROUND_BLEND_MODE_KEYWORDS } from "../constants";
import { prop } from "../utils";

export const generateBackgroundBlendMode = (
  cls: string,
): UtilityResult | null => {
  if (cls in BACKGROUND_BLEND_MODE_KEYWORDS) {
    return prop([
      `background-blend-mode: ${BACKGROUND_BLEND_MODE_KEYWORDS[cls as keyof typeof BACKGROUND_BLEND_MODE_KEYWORDS]}`,
    ]);
  }
  return null;
};
