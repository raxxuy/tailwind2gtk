export type VariantKind = "pseudo" | "arbitrary" | "media";

export interface Variant {
  kind: VariantKind;
  query?: string;
  value?: string;
}

export interface ParsedClass {
  raw: string;
  utility: string;
  variants: Variant[];
}

export interface StyleRule {
  children?: StyleRule[];
  properties: Record<string, string>;
  selector: string;
}

export const isMediaVariant = (
  v: Variant,
): v is Variant & { kind: "media"; query: string } =>
  v.kind === "media" && typeof v.query === "string";

export const isSelectorVariant = (
  v: Variant,
): v is Variant & { kind: "pseudo" | "arbitrary"; value: string } =>
  (v.kind === "pseudo" || v.kind === "arbitrary") &&
  typeof v.value === "string";
