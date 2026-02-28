import { BACKGROUND_BLEND_MODE_KEYWORDS } from "../constants";

export const generateBackgroundBlendMode = (cls: string): string[] | null => {
  if (cls in BACKGROUND_BLEND_MODE_KEYWORDS) {
    return [
      `background-blend-mode: ${BACKGROUND_BLEND_MODE_KEYWORDS[cls as keyof typeof BACKGROUND_BLEND_MODE_KEYWORDS]}`,
    ];
  }
  return null;
};
