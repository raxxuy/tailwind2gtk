import { it } from "node:test";

import { describe, expect } from "vitest";

import { defaults } from "../../../src/config/defaults";
import {
  resolveBorderColor,
  resolveDivideColor,
} from "../../../src/utilities/borders";

describe("generate border color utilities", () => {
  it("should generate border color utilities", () => {
    const classes = [
      "border-blue-500",
      "border-indigo-500/75",
      "border-[#312312]",
      "border-y-(--test-color)",
      "border-x-white",
    ];
    expect(
      classes.map((c) => resolveBorderColor({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "properties": {
            "border-color": "var(--color-blue-500)",
          },
        },
        {
          "properties": {
            "border-color": "oklch(from var(--color-indigo-500) l c h / 75%)",
          },
        },
        {
          "properties": {
            "border-color": "#312312",
          },
        },
        {
          "properties": {
            "border-bottom-color": "var(--test-color)",
            "border-top-color": "var(--test-color)",
          },
        },
        {
          "properties": {
            "border-left-color": "var(--color-white)",
            "border-right-color": "var(--color-white)",
          },
        },
      ]
    `);
  });

  it("should generate variables and arbitrary values", () => {
    const classes = [
      "divide-(--test-color)",
      "divide-red-500",
      "divide-[#000000]",
    ];
    expect(
      classes.map((c) => resolveDivideColor({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "properties": {
                "border-color": "var(--test-color)",
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
                "border-color": "var(--color-red-500)",
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
                "border-color": "#000000",
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
    const classes = ["divide-y-red-200", "border-[0.33rem]", "divide-[0.2]"];
    expect(
      classes.map((c) => resolveDivideColor({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        null,
        null,
        null,
      ]
    `);
  });
});
