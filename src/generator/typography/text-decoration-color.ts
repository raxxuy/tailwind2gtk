import { resolveColorValue } from "../utils";

export const generateTextDecorationColor = (cls: string): string[] | null => {
  const match = cls.match(
    /^decoration-(\[.+\]|\(.+\)|[a-z0-9-]+(?:\/[\d.]+)?)$/,
  );
  if (!match) return null;

  const value = resolveColorValue(match[1]);
  if (!value) return null;

  return [`text-decoration-color: ${value}`];
};
