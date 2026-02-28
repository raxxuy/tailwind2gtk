import { BACKGROUND_POSITION_KEYWORDS } from "../constants";
import { resolveDynamic } from "../utils";

export const generateBackgroundPosition = (cls: string): string[] | null => {
  if (!cls.startsWith("bg-")) return null;
  const key = cls.slice(3);

  if (key in BACKGROUND_POSITION_KEYWORDS) {
    return [
      `background-position: ${BACKGROUND_POSITION_KEYWORDS[key as keyof typeof BACKGROUND_POSITION_KEYWORDS]}`,
    ];
  }

  const match = cls.match(/^bg-position-(\[.+\]|\(.+\))$/);
  if (!match) return null;

  const value = resolveDynamic(match[1]);
  if (!value) return null;

  return [`background-position: ${value}`];
};
