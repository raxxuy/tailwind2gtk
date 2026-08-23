import { describe, expect, it } from "vitest";

import { defaults } from "../../../src/config/defaults";
import { resolveTransitionProperty } from "../../../src/utilities/transitions-animations";

describe("generate transition property utilities", () => {
  it("should generate transition property utilities", () => {
    const classes = [
      // Built-in
      "transition",
      "transition-none",
      "transition-all",
      "transition-colors",
      "transition-opacity",
      "transition-shadow",
      "transition-transform",

      // Arbitrary values
      "transition-[margin]",
      "transition-[width]",
      "transition-[height]",
      "transition-[font-size]",
      "transition-[border-radius]",
      "transition-[background-image]",
      "transition-[grid-template-columns]",
      "transition-[--my-transition-property]",

      // CSS variable references
      "transition-(--my-transition)",
      "transition-(--transition-property)",
      "transition-(--custom-property)",

      // Multiple properties
      "transition-[opacity,transform]",
      "transition-[color,background-color]",
      "transition-[width,height]",
      "transition-[margin,padding]",
      "transition-[transform,opacity,filter]",

      // Invalid / should return null
      "transition-foo",
      "transition-bar",
      "transition-invalid",
      "transition-123",
      "transition-unknown-property",

      // Similar prefixes / edge cases
      "transition-",
      "transition--",
      "transition-[",
      "transition-[]",
    ] as const;

    expect(
      classes.map((c) =>
        resolveTransitionProperty({ utility: c, config: defaults }),
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-property": "none",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "all",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "opacity",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "box-shadow",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "transform, translate, scale, rotate",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "margin",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "width",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "height",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "font-size",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "border-radius",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "background-image",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "grid-template-columns",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "--my-transition-property",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "var(--my-transition)",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "var(--transition-property)",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "var(--custom-property)",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "opacity,transform",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "color,background-color",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "width,height",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "margin,padding",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        {
          "properties": {
            "transition-duration": "var(--default-transition-duration)",
            "transition-property": "transform,opacity,filter",
            "transition-timing-function": "var(--default-transition-timing-function)",
          },
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ]
    `);
  });
});
