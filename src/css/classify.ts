import { defaults } from "../config/defaults";
import type { ResolvedConfig } from "../types/config";
import type { ClassifiedVariable, ModifierKey, RecordKey } from "../types/css";

const namespaces = (Object.keys(defaults) as Array<keyof ResolvedConfig>).sort(
  (a, b) => b.length - a.length,
);

export const classifyVariable = (name: string): ClassifiedVariable | null => {
  const stripped = name.slice(2);

  for (const namespace of namespaces) {
    if (typeof defaults[namespace] !== "object") continue; // scalar namespaces skip compound check

    if (stripped === namespace) continue; // handled elsewhere as exact match

    if (!stripped.startsWith(`${namespace}-`)) continue;

    const rest = stripped.slice(namespace.length + 1); // e.g. "tiny--line-height" or "display--font-feature-settings"

    const compoundMatch = rest.match(/^(.+)--(.+)$/);
    if (compoundMatch) {
      const [, token, modifier] = compoundMatch;
      return {
        key: namespace as ModifierKey,
        kind: "modifier",
        token,
        modifier,
      };
    }

    return { key: namespace as RecordKey, kind: "record", token: rest };
  }

  return null;
};
