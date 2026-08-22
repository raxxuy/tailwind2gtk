import { parseArbitrary } from "./arbitrary";
import { splitSign } from "./sign";
import { unwrapVarRef } from "./token";

interface ResolveNumberOptions {
  arbitrary?: boolean;
  extra?: string;
  fraction?: boolean;
  px?: boolean;
  spacing?: boolean;
  unit?: string;
  varRef?: boolean;
}

const DEFAULT_OPTIONS: Required<ResolveNumberOptions> = {
  arbitrary: true,
  fraction: true,
  px: true,
  spacing: true,
  varRef: true,
  extra: "",
  unit: undefined,
};

export const resolveNumber = (
  value: string,
  options: ResolveNumberOptions = {},
): string | null => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { negative, raw, sign } = splitSign(value);

  if (opts.fraction) {
    const fraction = raw.match(/^(\d+)\/(\d+)$/);
    if (fraction) return `calc(${sign}${fraction[1]} / ${fraction[2]} * 100%)`;
  }

  if (opts.px && raw === "px") return `${sign}1px`;

  if (opts.arbitrary) {
    const arbitrary = parseArbitrary(raw);
    if (arbitrary) return `${sign}${arbitrary}`;
  }

  if (opts.varRef) {
    const varRef = unwrapVarRef(raw, opts.extra);
    if (varRef) {
      return negative ? `calc(var(${varRef}) * -1)` : `var(${varRef})`;
    }
  }

  const num = Number(raw);
  if (Number.isNaN(num)) return null;

  if (opts.spacing) return `calc(var(--spacing) * ${negative ? -num : num})`;

  const unit = opts.unit ?? "px";
  return negative ? `calc(${num}${unit} * -1)` : `${num}${unit}`;
};
