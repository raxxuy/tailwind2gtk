import { TRANSITION_PROPERTIES } from "../constants";
import { resolveDynamic } from "../utils";

const DEFAULT_TRANSITION = [
  "transition-timing-function: var(--default-transition-timing-function)",
  "transition-duration: var(--default-transition-duration)",
];

export const generateTransition = (cls: string): string[] | null => {
  const match = cls.match(/^transition(?:-(\[.+\]|\(.+\)|[a-z-]+))?$/);
  if (!match) return null;

  const [, raw = ""] = match;

  if (raw === "none") return [`transition-property: none`];

  if (raw in TRANSITION_PROPERTIES) {
    return [
      `transition-property: ${TRANSITION_PROPERTIES[raw as keyof typeof TRANSITION_PROPERTIES]}`,
      ...DEFAULT_TRANSITION,
    ];
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`transition-property: ${value}`, ...DEFAULT_TRANSITION];
};
