import { resolveDynamic } from "../utils";

export const generateTransitionDelay = (cls: string): string[] | null => {
  const match = cls.match(/^delay-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return [`transition-delay: ${raw}ms`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`transition-delay: ${value}`];
};
