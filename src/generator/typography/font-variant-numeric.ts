import { FONT_VARIANT_NUMERIC } from "../constants";

export const generateFontVariantNumeric = (cls: string): string[] | null => {
  if (cls in FONT_VARIANT_NUMERIC) {
    return [
      `font-variant-numeric: ${FONT_VARIANT_NUMERIC[cls as keyof typeof FONT_VARIANT_NUMERIC]}`,
    ];
  }

  return null;
};
