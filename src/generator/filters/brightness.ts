import { resolveDynamic } from "../utils";

export const generateBrightness = (cls: string): string[] | null => {
  const match = cls.match(/^brightness-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return [`filter: brightness(${raw}%)`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: brightness(${value})`];
};
