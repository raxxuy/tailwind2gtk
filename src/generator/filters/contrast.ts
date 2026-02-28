import { resolveDynamic } from "../utils";

export const generateContrast = (cls: string): string[] | null => {
  const match = cls.match(/^contrast-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return [`filter: contrast(${raw}%)`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: contrast(${value})`];
};
