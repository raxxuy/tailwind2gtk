import type { UtilityResult } from "../../core";
import { BACKGROUND_BOX_KEYWORDS } from "../constants";
import { prop } from "../utils";

export const generateBackgroundOrigin = (cls: string): UtilityResult | null => {
  const match = cls.match(/^bg-origin-(.+)$/);
  if (!match) return null;

  const [, raw] = match;
  const value =
    BACKGROUND_BOX_KEYWORDS[raw as keyof typeof BACKGROUND_BOX_KEYWORDS];
  if (!value) return null;

  return prop([`background-origin: ${value}`]);
};
