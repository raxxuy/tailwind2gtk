import { resolveDynamic, toRem } from "../utils";

const resolveFraction = (raw: string): string | null => {
  const [num, den] = raw.split("/").map(Number);
  if (!den) return null;
  return `${((num / den) * 100).toFixed(3).replace(/\.?0+$/, "")}%`;
};

export const resolveValue = (raw: string): string | null => {
  if (raw === "px") return "1px";
  if (raw.includes("/")) return resolveFraction(raw);
  return resolveDynamic(raw) ?? toRem(raw);
};
