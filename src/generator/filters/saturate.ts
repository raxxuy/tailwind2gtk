import { resolveDynamic } from "../utils";

export const generateSaturate = (cls: string): string[] | null => {
  const match = cls.match(/^saturate-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return [`filter: saturate(${raw}%)`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: saturate(${value})`];
};
