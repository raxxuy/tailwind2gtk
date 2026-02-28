import { BACKGROUND_SIZE_KEYWORDS } from "../constants";
import { resolveDynamic } from "../utils";

export const generateBackgroundSize = (cls: string): string[] | null => {
  if (cls in BACKGROUND_SIZE_KEYWORDS) {
    return [
      `background-size: ${BACKGROUND_SIZE_KEYWORDS[cls as keyof typeof BACKGROUND_SIZE_KEYWORDS]}`,
    ];
  }

  const match = cls.match(/^bg-size-(\[.+\]|\(.+\))$/);
  if (!match) return null;

  const value = resolveDynamic(match[1]);
  if (!value) return null;

  return [`background-size: ${value}`];
};
