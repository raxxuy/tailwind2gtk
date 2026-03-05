import type { UtilityResult } from "../../core";
import { prop } from "../utils";

export const generateFontStyle = (cls: string): UtilityResult | null => {
  if (cls === "italic") return prop([`font-style: italic`]);
  if (cls === "not-italic") return prop([`font-style: normal`]);
  return null;
};
