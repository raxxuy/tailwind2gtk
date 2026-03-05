import type { UtilityResult } from "../../core";
import { BACKGROUND_REPEAT_KEYWORDS } from "../constants";
import { prop } from "../utils";

export const generateBackgroundRepeat = (cls: string): UtilityResult | null => {
  if (cls in BACKGROUND_REPEAT_KEYWORDS) {
    return prop([
      `background-repeat: ${BACKGROUND_REPEAT_KEYWORDS[cls as keyof typeof BACKGROUND_REPEAT_KEYWORDS]}`,
    ]);
  }

  return null;
};
