import { BACKGROUND_BOX_KEYWORDS } from "../constants";

export const generateBackgroundOrigin = (cls: string): string[] | null => {
  const match = cls.match(/^bg-origin-(.+)$/);
  if (!match) return null;

  const [, raw] = match;
  const value =
    BACKGROUND_BOX_KEYWORDS[raw as keyof typeof BACKGROUND_BOX_KEYWORDS];
  if (!value) return null;

  return [`background-origin: ${value}`];
};
