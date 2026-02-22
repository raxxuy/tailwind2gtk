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

  const sections: string[] = [];

  for (const cls of usedClasses) {
    const utility = getUtility(cls);
    if (!utility) continue;
    sections.push(`.${escapeClassName(cls)} { ${utility.join("; ")}; }`);
  }

  const sorted = sections.sort((a, b) => {
    const getClassName = (s: string) => {
      const match = s.match(/^\.([^\s{]+)/);
      return match ? match[1].replace(/\\/g, "") : s;
    };

    const classA = getClassName(a);
    const classB = getClassName(b);
    const priorityDiff = getStatePriority(classA) - getStatePriority(classB);

    return priorityDiff !== 0 ? priorityDiff : classA.localeCompare(classB);
  });

  return `${header}\n${sorted.join("\n")}`;
};
