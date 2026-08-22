import type { StyleRule } from "../types";
import type { ResolvedConfig } from "../types/config";
import { compileClass } from "./compile";
import { escapeClass } from "./escape";
import { serializeRule } from "./serialize";

export const compileApply = (cls: string, config: ResolvedConfig): string => {
  if (!(cls in config.extra.apply)) return "";

  const rules = config.extra.apply[cls]
    .map((c) => compileClass(c, config))
    .filter((r): r is StyleRule => r !== null);

  return serializeRule({
    selector: `.${escapeClass(cls)}`,
    properties: Object.assign({}, ...rules.map((r) => r.properties)),
    children: rules.flatMap((r) => r.children ?? []),
  });
};
