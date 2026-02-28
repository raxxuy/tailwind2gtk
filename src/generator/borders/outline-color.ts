import { resolveColorValue } from "../utils";

export const generateOutlineColor = (cls: string): string[] | null => {
  const match = cls.match(/^outline-((?:\[.+\]|\(.+\)|[a-z0-9-]+)(?:\/[\d.[\]]+)?)$/);
  if (!match) return null;

  const value = resolveColorValue(match[1]);
  if (!value) return null;

  return [`outline-color: ${value}`];
};
