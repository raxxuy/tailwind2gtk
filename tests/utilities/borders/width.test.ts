import { describe, expect, it } from "vitest";

import { defaults } from "../../../src/config/defaults";
import { resolveBorderWidth } from "../../../src/utilities/borders";

describe("generate border width utilities", () => {
  it("should generate border width utilities", () => {
    const classes = ["border", "border-t-2", "border-x-4"];
    expect(
      classes.map((c) => resolveBorderWidth({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "properties": {
            "border-style": "var(--tw-border-style)",
            "border-width": "1px",
          },
        },
        {
          "properties": {
            "border-top-style": "var(--tw-border-style)",
            "border-top-width": "2px",
          },
        },
        {
          "properties": {
            "border-left-style": "var(--tw-border-style)",
            "border-left-width": "4px",
            "border-right-style": "var(--tw-border-style)",
            "border-right-width": "4px",
          },
        },
      ]
    `);
  });

  it("should generate variables and arbitrary values", () => {
    const classes = [
      "border-(length:--test-width)",
      "border-t-(length:--test-t-width)",
      "border-b-[0.33rem]",
    ];
    expect(
      classes.map((c) => resolveBorderWidth({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "properties": {
            "border-style": "var(--tw-border-style)",
            "border-width": "var(--test-width)",
          },
        },
        {
          "properties": {
            "border-top-style": "var(--tw-border-style)",
            "border-top-width": "var(--test-t-width)",
          },
        },
        {
          "properties": {
            "border-bottom-style": "var(--tw-border-style)",
            "border-bottom-width": "0.33rem",
          },
        },
      ]
    `);
  });

  it("should not generate utilities", () => {
    const classes = [
      "test",
      "border-br-2",
      "border-(--test-width)",
      "border-24p",
    ];
    expect(
      classes.map((c) => resolveBorderWidth({ utility: c, config: defaults })),
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
