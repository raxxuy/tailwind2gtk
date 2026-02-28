import { TEXT_TRANSFORMS } from "../constants";

export const generateTextTransform = (cls: string): string[] | null => {
  if (cls in TEXT_TRANSFORMS) {
    return [
      `text-transform: ${TEXT_TRANSFORMS[cls as keyof typeof TEXT_TRANSFORMS]}`,
    ];
  }

  return null;
};
