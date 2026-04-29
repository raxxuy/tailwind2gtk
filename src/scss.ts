import { generateRoot, getUtility } from "./generator";
import { STATES, type State } from "./states";

const escapeClassName = (cls: string) =>
  cls.replace(/[!:.,'">&%()#/[\]]/g, "\\$&");

const isArbitrarySelector = (part: string) => part.startsWith("[&");

const splitParts = (cls: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let current = "";

  for (const char of cls) {
    if (char === "[" || char === "(") depth++;
    else if (char === "]" || char === ")") depth--;
    else if (char === ":" && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }
    current += char;
  }

  parts.push(current);
  return parts;
};

const getStates = (cls: string) => {
  const parts = splitParts(cls);
  const states = parts.slice(0, -1);
  const media = states.find((s) => s === "dark" || s === "light") ?? null;
  const arbitrarySelector = states.find(isArbitrarySelector) ?? null;
  const pseudos = states.filter(
    (s) => s !== "dark" && s !== "light" && !isArbitrarySelector(s),
  );

  return { pseudos, media, arbitrarySelector };
};

const getStatePriority = (className: string): number => {
  const state = splitParts(className)[0];
  const priority = STATES.indexOf(state as State);
  return priority === -1 ? 999 : priority;
};

const comparePriority = (a: string, b: string): number => {
  const getClassName = (s: string) => {
    const match = s.match(/^\.([^\s{]+)/);
    return match ? match[1].replace(/\\/g, "") : s;
  };

  const classA = getClassName(a);
  const classB = getClassName(b);
  const priorityDiff = getStatePriority(classA) - getStatePriority(classB);
  return priorityDiff !== 0 ? priorityDiff : classA.localeCompare(classB);
};

const buildRule = (selector: string, properties: string[]): string =>
  `${selector} { ${properties.join("; ")}; }`;

export interface ScssOptions {
  header?: string;
}

export const generateScss = (
  usedClasses: Set<string>,
  options: ScssOptions = {},
): string => {
  const { header = "/* Auto-generated utility classes */" } = options;

  const base: string[] = [];
  const important: string[] = [];
  const dark: string[] = [];
  const light: string[] = [];

  for (const cls of usedClasses) {
    const utility = getUtility(cls);
    if (!utility) continue;

    const { pseudos, media, arbitrarySelector } = getStates(cls);
    const escapedCls = `.${escapeClassName(cls)}`;
    const pseudoSuffix = pseudos.length > 0 ? `:${pseudos.join(":")}` : "";
    
    const outerSelector = arbitrarySelector
      ? arbitrarySelector.slice(1, -1).replace("&", escapedCls)
      : `${escapedCls}${pseudoSuffix}`;

    const css = utility.selector
      ? buildRule(outerSelector, [
          `${utility.selector} { ${utility.properties.join("; ")}; }`,
        ])
      : buildRule(outerSelector, utility.properties);

    const baseCls = cls.split(":").at(-1) ?? cls;
    if (baseCls.endsWith("!")) important.push(css);
    else if (media === "dark") dark.push(css);
    else if (media === "light") light.push(css);
    else base.push(css);
  }

  base.sort(comparePriority);
  dark.sort(comparePriority);
  light.sort(comparePriority);

  const sections: string[] = [header, generateRoot(), ...base, ...important];

  if (dark.length > 0) {
    sections.push(
      `@media (prefers-color-scheme: dark) {\n${dark.map((r) => `  ${r}`).join("\n")}\n}`,
    );
  }

  if (light.length > 0) {
    sections.push(
      `@media (prefers-color-scheme: light) {\n${light.map((r) => `  ${r}`).join("\n")}\n}`,
    );
  }

  return sections.join("\n");
};
