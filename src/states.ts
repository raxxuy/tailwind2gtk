export const STATES = [
  "",
  "dark",
  "light",
  "hover",
  "focus",
  "active",
  "checked",
  "disabled",
  "selected",
  "first-child",
  "last-child",
  "focus-within",
  "focus-visible",
] as const;

export type State = (typeof STATES)[number];
