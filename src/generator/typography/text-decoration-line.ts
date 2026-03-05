import type { UtilityResult } from "../../core";
import { TEXT_DECORATIONS } from "../constants";
import { prop } from "../utils";

export const generateTextDecorationLine = (
  cls: string,
): UtilityResult | null => {
  if (cls in TEXT_DECORATIONS) {
    return prop([
      `text-decoration-line: ${TEXT_DECORATIONS[cls as keyof typeof TEXT_DECORATIONS]}`,
    ]);
  }

  return null;
};
