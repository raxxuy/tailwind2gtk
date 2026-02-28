import { resolveDynamic } from "../utils";

export const generateOpacity = (cls: string): string[] | null => {
  const match = cls.match(/^opacity-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return [`opacity: ${raw}%`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`opacity: ${value}`];
};
