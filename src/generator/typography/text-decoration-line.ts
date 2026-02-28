import { TEXT_DECORATIONS } from "../constants";

export const generateTextDecorationLine = (cls: string): string[] | null => {
  if (cls in TEXT_DECORATIONS) {
    return [
      `text-decoration-line: ${TEXT_DECORATIONS[cls as keyof typeof TEXT_DECORATIONS]}`,
    ];
  }

  return null;
};
