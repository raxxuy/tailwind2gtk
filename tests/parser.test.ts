import { describe, expect, it } from "vitest";

import { parseClass } from "@/compiler/parser";

describe("parseClass", () => {
  it("should parse a class with nth-[2n] pseudo-class", () => {
    const result = parseClass("nth-[2n]:hover:text-white");
    expect(result.utility).toBe("text-white");
    expect(result.variants).toHaveLength(2);
    expect(result.variants[0].kind).toBe("pseudo");
    expect(result.variants[0].value).toBe("nth-child(2n)");
    expect(result.variants[1].kind).toBe("pseudo");
    expect(result.variants[1].value).toBe("hover");
  });

  it("should parse a selector", () => {
    const result = parseClass("*:hover:text-white");
    expect(result.utility).toBe("text-white");
    expect(result.variants).toHaveLength(2);
    expect(result.variants[0].kind).toBe("selector");
    expect(result.variants[0].value).toBe("*");
    expect(result.variants[1].kind).toBe("pseudo");
    expect(result.variants[1].value).toBe("hover");
  });
});

describe("error cases", () => {
  it("should throw an error for invalid pseudo-class", () => {
    expect(() => parseClass("not-test:hover:text-white")).toThrow();
  });
});

// hover:contrast-more:text-white
