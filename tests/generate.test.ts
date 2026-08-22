import { describe, expect, it } from "vitest";

import { parseClass } from "@/compiler/parser";
import { generateRule } from "@/compiler/rule";
import { defaults } from "@/config/defaults";

describe("generateRule", () => {
  it("generates a simple rule", () => {
    const parsed = parseClass("nth-[2n]:hover:contrast-more:text-white");
    const result = generateRule(parsed, defaults);
    expect(result).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "children": [
                      {
                        "properties": {
                          "color": "var(--color-white)",
                        },
                      },
                    ],
                    "properties": {},
                    "selector": "@media (prefers-contrast: more)",
                  },
                ],
                "properties": {},
                "selector": "&:hover",
              },
            ],
            "properties": {},
            "selector": "&:nth-child(2n)",
          },
        ],
        "properties": {},
        "selector": ".nth-\\[2n\\]\\:hover\\:contrast-more\\:text-white",
      }
    `);
  });

  it("generates a min-height rule", () => {
    const parsed = parseClass("min-h-4");
    const result = generateRule(parsed, defaults);

    expect(result).toMatchInlineSnapshot(`
      {
        "children": [],
        "properties": {
          "min-height": "calc(var(--spacing) * 4)",
        },
        "selector": ".min-h-4",
      }
    `);
  });

  it("generates a margin rule", () => {
    const parsed1 = parseClass("m-4");
    const parsed2 = parseClass("space-x-2");
    const result1 = generateRule(parsed1, defaults);
    const result2 = generateRule(parsed2, defaults);

    expect(result1).toMatchInlineSnapshot(`
      {
        "children": [],
        "properties": {
          "margin": "calc(var(--spacing) * 4)",
        },
        "selector": ".m-4",
      }
    `);
    expect(result2).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "properties": {
              "--tw-space-x-reverse": "0",
              "margin-left": "calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse))",
              "margin-right": "calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))",
            },
            "selector": "& > :not(:last-child)",
          },
        ],
        "properties": {},
        "selector": ".space-x-2",
      }
    `);
  });
});
