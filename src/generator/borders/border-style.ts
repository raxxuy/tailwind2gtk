import type { UtilityResult } from "../../core";
import { CHILD_SELECTOR, LINE_STYLES } from "../constants";
import { prop, propWithSelector } from "../utils";

export const generateBorderStyle = (cls: string): UtilityResult | null => {
  const match = cls.match(/^border-(solid|dashed|dotted|double|hidden|none)$/);
  if (!match) return null;

  return prop([
    `border-style: ${LINE_STYLES[match[1] as keyof typeof LINE_STYLES]}`,
  ]);
};

export const generateDivideStyle = (cls: string): UtilityResult | null => {
  const match = cls.match(/^divide-(solid|dashed|dotted|double|hidden|none)$/);
  if (!match) return null;

  return propWithSelector(CHILD_SELECTOR, [
    `border-style: ${LINE_STYLES[match[1] as keyof typeof LINE_STYLES]}`,
  ]);
};
