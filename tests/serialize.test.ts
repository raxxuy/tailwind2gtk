import { describe, expect, it } from "vitest";

import { parseClass } from "@/compiler/parser";
import { generateRule } from "@/compiler/rule";
import { serializeRule } from "@/compiler/serialize";
import { defaults } from "@/config/defaults";
import type { StyleRule } from "@/types";

describe("serializeRule", () => {
  it("should properly serialize a rule", () => {
    const parsed = parseClass("nth-[2n]:hover:contrast-more:text-white");
    const rule = generateRule(parsed, defaults) as StyleRule;
    const result = serializeRule(rule);

    expect(result).toBe(`.nth-\\[2n\\]\\:hover\\:contrast-more\\:text-white {
  &:nth-child(2n) {
    &:hover {
      @media (prefers-contrast: more) {
        color: var(--color-white);
      }
    }
  }
}`);
  });
});
