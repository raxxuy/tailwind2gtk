import { resolveDynamic } from "../utils";

export const generateFilter = (cls: string): string[] | null => {
  if (cls === "filter-none") return [`filter: none`];

  const match = cls.match(/^filter-(\[.+\]|\(.+\))$/);
  if (!match) return null;

  const value = resolveDynamic(match[1]);
  if (!value) return null;

  return [`filter: ${value}`];
};
