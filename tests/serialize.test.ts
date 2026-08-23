import { describe, expect, it } from "vitest";

import { parseClass } from "../src/compiler/parser";
import { generateRule } from "../src/compiler/rule";
import { serializeRule } from "../src/compiler/serialize";
import { defaults } from "../src/config/defaults";
import type { StyleRule } from "../src/types";

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
