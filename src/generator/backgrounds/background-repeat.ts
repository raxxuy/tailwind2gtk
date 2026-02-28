import { BACKGROUND_REPEAT_KEYWORDS } from "../constants";

export const generateBackgroundRepeat = (cls: string): string[] | null => {
  if (cls in BACKGROUND_REPEAT_KEYWORDS) {
    return [
      `background-repeat: ${BACKGROUND_REPEAT_KEYWORDS[cls as keyof typeof BACKGROUND_REPEAT_KEYWORDS]}`,
    ];
  }

  return null;
};
