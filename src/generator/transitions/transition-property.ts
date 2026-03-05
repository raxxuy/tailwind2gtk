import type { UtilityResult } from "../../core";
import { TRANSITION_PROPERTIES } from "../constants";
import { prop, resolveDynamic } from "../utils";

const DEFAULT_TRANSITION = [
  "transition-timing-function: var(--default-transition-timing-function)",
  "transition-duration: var(--default-transition-duration)",
];

export const generateTransition = (cls: string): UtilityResult | null => {
  const match = cls.match(/^transition(?:-(\[.+\]|\(.+\)|[a-z-]+))?$/);
  if (!match) return null;

  const [, raw = ""] = match;

  if (raw === "none") return prop(["transition-property: none"]);

  if (raw in TRANSITION_PROPERTIES) {
    return prop([
      `transition-property: ${TRANSITION_PROPERTIES[raw as keyof typeof TRANSITION_PROPERTIES]}`,
      ...DEFAULT_TRANSITION,
    ]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`transition-property: ${value}`, ...DEFAULT_TRANSITION]);
};
