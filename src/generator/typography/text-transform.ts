import type { UtilityResult } from "../../core";
import { TEXT_TRANSFORMS } from "../constants";
import { prop } from "../utils";

export const generateTextTransform = (cls: string): UtilityResult | null => {
  if (cls in TEXT_TRANSFORMS) {
    return prop([
      `text-transform: ${TEXT_TRANSFORMS[cls as keyof typeof TEXT_TRANSFORMS]}`,
    ]);
  }

  return null;
};
