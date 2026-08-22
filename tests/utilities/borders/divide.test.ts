import { describe, expect, it } from "vitest";

import { defaults } from "@/config/defaults";
import { resolveDivide } from "@/utilities/borders";

describe("generate divide utilities", () => {
  it("should generate divide utilities", () => {
    const classes = ["divide-y-reverse", "divide-y-2", "divide-x-4"];
    expect(
      classes.map((c) => resolveDivide({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "properties": {
                "--tw-divide-y-reverse": "1",
              },
              "selector": "& > :not(:last-child)",
            },
          ],
          "properties": {},
        },
        {
          "children": [
            {
              "properties": {
                "--tw-divide-y-reverse": "0",
                "border-bottom-style": "var(--tw-border-style)",
                "border-bottom-width": "calc(2px * calc(1 - var(--tw-divide-y-reverse)))",
                "border-top-style": "var(--tw-border-style)",
                "border-top-width": "calc(2px * var(--tw-divide-y-reverse))",
              },
              "selector": "& > :not(:last-child)",
            },
          ],
          "properties": {},
        },
        {
          "children": [
            {
              "properties": {
                "--tw-divide-x-reverse": "0",
                "border-left-style": "var(--tw-border-style)",
                "border-left-width": "calc(4px * var(--tw-divide-x-reverse))",
                "border-right-style": "var(--tw-border-style)",
                "border-right-width": "calc(4px * calc(1 - var(--tw-divide-x-reverse)))",
              },
              "selector": "& > :not(:last-child)",
            },
          ],
          "properties": {},
        },
      ]
    `);
  });

  it("should generate variables and arbitrary values", () => {
    const classes = [
      "divide-x-(length:--test-width)",
      "divide-y-(length:--test-t-width)",
      "divide-x-[0.33rem]",
    ];
    expect(
      classes.map((c) => resolveDivide({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "properties": {
                "--tw-divide-x-reverse": "0",
                "border-left-style": "var(--tw-border-style)",
                "border-left-width": "calc(var(--test-width) * var(--tw-divide-x-reverse))",
                "border-right-style": "var(--tw-border-style)",
                "border-right-width": "calc(var(--test-width) * calc(1 - var(--tw-divide-x-reverse)))",
              },
              "selector": "& > :not(:last-child)",
            },
          ],
          "properties": {},
        },
        {
          "children": [
            {
              "properties": {
                "--tw-divide-y-reverse": "0",
                "border-bottom-style": "var(--tw-border-style)",
                "border-bottom-width": "calc(var(--test-t-width) * calc(1 - var(--tw-divide-y-reverse)))",
                "border-top-style": "var(--tw-border-style)",
                "border-top-width": "calc(var(--test-t-width) * var(--tw-divide-y-reverse))",
              },
              "selector": "& > :not(:last-child)",
            },
          ],
          "properties": {},
        },
        {
          "children": [
            {
              "properties": {
                "--tw-divide-x-reverse": "0",
                "border-left-style": "var(--tw-border-style)",
                "border-left-width": "calc(0.33rem * var(--tw-divide-x-reverse))",
                "border-right-style": "var(--tw-border-style)",
                "border-right-width": "calc(0.33rem * calc(1 - var(--tw-divide-x-reverse)))",
              },
              "selector": "& > :not(:last-child)",
            },
          ],
          "properties": {},
        },
      ]
    `);
  });

  it("should not generate utilities", () => {
    const classes = [
      "test",
      "divide",
      "divide-y-(--test)",
      "divide-x-(--test)",
    ];
    expect(
      classes.map((c) => resolveDivide({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        null,
        null,
        null,
        null,
      ]
    `);
  });
});
