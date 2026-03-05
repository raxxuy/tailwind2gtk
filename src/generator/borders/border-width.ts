import type { UtilityResult } from "../../core";
import { CHILD_SELECTOR, DIRECTIONS } from "../constants";
import { prop, propWithSelector, resolveDynamic } from "../utils";

const resolveBorderWidth = (raw: string): string | null => {
  if (raw === "") return "1px";
  if (raw.match(/^[\d.]+$/)) return `${raw}px`;
  if (raw.startsWith("(length:")) return `var(${raw.slice(8, -1)})`;
  return resolveDynamic(raw);
};

const divideX = (value: string): UtilityResult =>
  propWithSelector(CHILD_SELECTOR, [
    "border-inline-start-width: 0px",
    `border-inline-end-width: ${value}`,
  ]);

const divideY = (value: string): UtilityResult =>
  propWithSelector(CHILD_SELECTOR, [
    "border-top-width: 0px",
    `border-bottom-width: ${value}`,
  ]);

export const generateBorderWidth = (cls: string): UtilityResult | null => {
  const match = cls.match(
    /^border(-[xytbrl])?(?:-(\[.+\]|\(length:.+\)|[\d.]+))?$/,
  );
  if (!match) return null;

  const [, dirRaw = "", raw = ""] = match;
  const value = resolveBorderWidth(raw);
  if (!value) return null;

  const parts = DIRECTIONS[dirRaw.slice(1) as keyof typeof DIRECTIONS];
  return prop(
    parts.flatMap((p) => [
      `border${p ? `-${p}` : ""}-width: ${value}`,
      `border${p ? `-${p}` : ""}-style: solid`,
    ]),
  );
};

export const generateDivide = (cls: string): UtilityResult | null => {
  if (cls === "divide-x-reverse") return prop(["--tw-divide-x-reverse: 1"]);
  if (cls === "divide-y-reverse") return prop(["--tw-divide-y-reverse: 1"]);
  if (cls === "divide-x") return divideX("1px");
  if (cls === "divide-y") return divideY("1px");

  const xMatch = cls.match(/^divide-x-(\[.+\]|\(length:(.+)\)|([\d.]+))$/);
  if (xMatch) {
    const value = xMatch[2]
      ? `var(${xMatch[2]})`
      : xMatch[3]
        ? `${xMatch[3]}px`
        : resolveDynamic(xMatch[1]);
    if (!value) return null;
    return divideX(value);
  }

  const yMatch = cls.match(/^divide-y-(\[.+\]|\(length:(.+)\)|([\d.]+))$/);
  if (yMatch) {
    const value = yMatch[2]
      ? `var(${yMatch[2]})`
      : yMatch[3]
        ? `${yMatch[3]}px`
        : resolveDynamic(yMatch[1]);
    if (!value) return null;
    return divideY(value);
  }

  return null;
};
