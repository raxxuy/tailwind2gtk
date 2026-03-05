import type { UtilityResult } from "../../core";
import { TEXT_DECORATION_STYLES } from "../constants";
import { prop } from "../utils";

export const generateTextDecorationStyle = (
  cls: string,
): UtilityResult | null => {
  const match = cls.match(/^decoration-(solid|double|dotted|dashed|wavy)$/);
  if (!match) return null;

  return prop([
    `text-decoration-style: ${TEXT_DECORATION_STYLES[match[1] as keyof typeof TEXT_DECORATION_STYLES]}`,
  ]);
};
