import { describe, it } from "vitest";
import { defaults } from "../src/config/defaults";
import { generateRule } from "../src/generate";
import { parseClass } from "../src/parser";

describe("generateRule", () => {
  it("generates a simple rule", () => {
    const parsed = parseClass("nth-[2n]:hover:contrast-more:text-white");
    const result = generateRule(parsed, defaults);

    console.log(result);
  });
});
