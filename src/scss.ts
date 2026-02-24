import { getUtility } from "./generator";
import { STATES, type State } from "./states";

const mediaStates = new Set(["dark", "light"]);

const escapeClassName = (cls: string) => {
  const escaped = cls.replace(/[:.#/[\]]/g, "\\$&");
  const state = cls.includes(":") ? cls.split(":")[0] : null;
  if (!state || mediaStates.has(state)) return escaped;
  return `${escaped}:${state}`;
};

const getStatePriority = (className: string): number => {
  const state = className.split(":")[0];
  const priority = STATES.indexOf(state as State);
  return priority === -1 ? 999 : priority;
};

export interface ScssOptions {
  header?: string;
}

export const generateScss = (
  usedClasses: Set<string>,
  options: ScssOptions = {},
): string => {
  const { header = "/* Auto-generated utility classes */" } = options;

  const base: string[] = [];
  const dark: string[] = [];
  const light: string[] = [];

  for (const cls of usedClasses) {
    const utility = getUtility(cls);
    if (!utility || utility.length === 0) continue;

    const rule = `.${escapeClassName(cls)} { ${utility.join("; ")}; }`;
    const state = cls.includes(":") ? cls.split(":")[0] : null;

    if (state === "dark") dark.push(rule);
    else if (state === "light") light.push(rule);
    else base.push(rule);
  }

  const comparePriority = (a: string, b: string) => {
    const getClassName = (s: string) => {
      const match = s.match(/^\.([^\s{]+)/);
      return match ? match[1].replace(/\\/g, "") : s;
    };

    const classA = getClassName(a);
    const classB = getClassName(b);
    const priorityDiff = getStatePriority(classA) - getStatePriority(classB);
    return priorityDiff !== 0 ? priorityDiff : classA.localeCompare(classB);
  };

  base.sort(comparePriority);
  dark.sort(comparePriority);
  light.sort(comparePriority);

  const sections: string[] = [header, ...base];

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
