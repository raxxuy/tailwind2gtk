import { DIRECTIONS } from "../constants";
import { resolveDynamic } from "../utils";

const resolveBorderWidth = (raw: string): string | null => {
  if (raw === "") return "1px";
  if (raw.match(/^[\d.]+$/)) return `${raw}px`;
  if (raw.startsWith("(length:")) return `var(${raw.slice(8, -1)})`;
  return resolveDynamic(raw);
};

export const generateBorderWidth = (cls: string): string[] | null => {
  const match = cls.match(
    /^border(-[xytbrl])?(?:-(\[.+\]|\(length:.+\)|[\d.]+))?$/,
  );
  if (!match) return null;

  const [, dirRaw = "", raw = ""] = match;
  const value = resolveBorderWidth(raw);
  if (!value) return null;

  const parts = DIRECTIONS[dirRaw.slice(1) as keyof typeof DIRECTIONS];
  return parts.flatMap((p) => [
    `border${p ? `-${p}` : ""}-width: ${value}`,
    `border${p ? `-${p}` : ""}-style: solid`,
  ]);
};
