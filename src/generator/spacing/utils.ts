import { resolveDynamic, toRem } from "../utils";

export const resolveValue = (raw: string): string | null => {
  if (raw === "px") return "1px";
  return resolveDynamic(raw) ?? toRem(raw);
};
