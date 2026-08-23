import { describe, expect, it } from "vitest";

import { defaults } from "../../../src/config/defaults";
import { resolveBorderRadius } from "../../../src/utilities/borders";

describe("generate radius utilities", () => {
  it("should generate radius utilities", () => {
    const classes = [
      "rounded",
      "rounded-sm",
      "rounded-b-lg",
      "rounded-t-xl",
      "rounded-full",
      "rounded-none",
    ];
    expect(
      classes.map((c) => resolveBorderRadius({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "properties": {
            "border-radius": "0.25rem",
          },
        },
        {
          "properties": {
            "border-radius": "var(--radius-sm)",
          },
        },
        {
          "properties": {
            "border-bottom-left-radius": "var(--radius-lg)",
            "border-bottom-right-radius": "var(--radius-lg)",
          },
        },
        {
          "properties": {
            "border-top-left-radius": "var(--radius-xl)",
            "border-top-right-radius": "var(--radius-xl)",
          },
        },
        {
          "properties": {
            "border-radius": "9999px",
          },
        },
        {
          "properties": {
            "border-radius": "0",
          },
        },
      ]
    `);
  });

  it("should generate variables and arbitrary values", () => {
    const classes = [
      "rounded-(--test-radius)",
      "rounded-tr-(--test-tr-radius)",
      "rounded-bl-[0.33rem]",
    ];
    expect(
      classes.map((c) => resolveBorderRadius({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "properties": {
            "border-radius": "var(--test-radius)",
          },
        },
        {
          "properties": {
            "border-top-right-radius": "var(--test-tr-radius)",
          },
        },
        {
          "properties": {
            "border-bottom-left-radius": "0.33rem",
          },
        },
      ]
    `);
  });

  it("should not generate utilities", () => {
    const classes = ["test", "rounded-2", "rounded-p-sm"];
    expect(
      classes.map((c) => resolveBorderRadius({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        null,
        null,
        null,
      ]
    `);
  });
});
