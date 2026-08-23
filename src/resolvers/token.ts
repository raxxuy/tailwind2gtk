import type { CompoundValue } from "../types";
import { parseArbitrary } from "./arbitrary";

interface TokenResolverProps<T = string> {
  extra?: string;
  formatVar?: (value: string) => T;
  tokenMap?: Record<string, string | CompoundValue>;
  validator?: (value: string) => boolean;
  value: string;
}

export const unwrapVarRef = (value: string, extra?: string): string | null => {
  const prefix = extra ? `${extra}:` : "";
  const match = value.match(new RegExp(`^\\(${prefix}(--[^)]+)\\)$`));
  return match?.[1] ?? null;
};

export const resolveToken = <T = string>({
  value,
  tokenMap,
  formatVar,
  extra,
  validator,
}: TokenResolverProps<T>): T | string | null => {
  if (tokenMap && value in tokenMap) return formatVar ? formatVar(value) : null;

  const varRef = unwrapVarRef(value, extra);
  if (varRef) return `var(${varRef})`;

  const arbitrary = parseArbitrary(value);
  if (arbitrary && (!validator || validator(arbitrary))) return arbitrary;

  return null;
};
