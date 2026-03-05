import type { UtilityResult } from "../../core";
import { FONT_VARIANT_NUMERIC } from "../constants";
import { prop } from "../utils";

export const generateFontVariantNumeric = (
  cls: string,
): UtilityResult | null => {
  if (cls in FONT_VARIANT_NUMERIC) {
    return prop([
      `font-variant-numeric: ${FONT_VARIANT_NUMERIC[cls as keyof typeof FONT_VARIANT_NUMERIC]}`,
    ]);
  }

  return null;
};
