import { resolveDynamic } from "../utils";

export const generateTransitionDuration = (cls: string): string[] | null => {
  const match = cls.match(/^duration-(\[.+\]|\(.+\)|[\d.]+|[a-z]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "initial") return ["transition-duration: initial"];
  if (raw.match(/^[\d.]+$/)) return [`transition-duration: ${raw}ms`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`transition-duration: ${value}`];
};
