import type { CompoundValue, ResolvedConfig } from "./config";

type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type ContainsCompoundValue<T> = {
  [K in keyof T]: T[K] extends Record<string, infer V>
    ? CompoundValue extends V
      ? K
      : never
    : never;
}[keyof T];

export type ScalarKey = KeysOfType<ResolvedConfig, string>;

export type RecordKey = Exclude<
  KeysOfType<ResolvedConfig, Record<string, string>>,
  ModifierKey
>;

export type ModifierKey = ContainsCompoundValue<ResolvedConfig>;

export type ClassifiedVariable =
  | {
      kind: "scalar";
      key: ScalarKey;
    }
  | {
      kind: "record";
      key: RecordKey;
      token: string;
    }
  | {
      kind: "modifier";
      key: ModifierKey;
      token: string;
      modifier: string;
    };

export interface CSSVariable {
  name: string;
  value: string;
}

export interface Keyframe {
  property: string;
  value: string;
}

export interface ApplyRule {
  children: Record<string, ApplyRule>;
  classes: string[];
}

export interface KeyframeDeclaration {
  property: string;
  value: string;
}

export interface KeyframeStep {
  declarations: KeyframeDeclaration[];
  selector: string;
}
