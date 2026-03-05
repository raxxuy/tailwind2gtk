import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

const resolveOutlineWidth = (raw: string): string | null => {
  if (raw === "") return "1px";
  if (raw.match(/^[\d.]+$/)) return `${raw}px`;
  if (raw.startsWith("(length:")) return `var(${raw.slice(8, -1)})`;
  return resolveDynamic(raw);
};

export const generateOutlineWidth = (cls: string): UtilityResult | null => {
  const match = cls.match(/^outline(?:-(\[.+\]|\(length:.+\)|[\d.]+))?$/);
  if (!match) return null;

  const value = resolveOutlineWidth(match[1] ?? "");
  if (!value) return null;

  return prop([`outline-width: ${value}`, `outline-style: solid`]);
};
