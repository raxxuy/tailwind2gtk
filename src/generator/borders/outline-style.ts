import type { UtilityResult } from "../../core";
import { LINE_STYLES } from "../constants";
import { prop } from "../utils";

export const generateOutlineStyle = (cls: string): UtilityResult | null => {
  if (cls === "outline-hidden") {
    return prop(["outline: 2px solid transparent", "outline-offset: 2px"]);
  }

  const match = cls.match(/^outline-(solid|dashed|dotted|double|none)$/);
  if (!match) return null;

  return prop([
    `outline-style: ${LINE_STYLES[match[1] as keyof typeof LINE_STYLES]}`,
  ]);
};
