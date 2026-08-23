import { describe, expect, it } from "vitest";

import { defaults } from "../../../src/config/defaults";
import {
  resolveDropShadow,
  resolveDropShadowColor,
} from "../../../src/utilities/filters";

describe("generate drop shadow utilities", () => {
  it("should generate drop shadow utilities", () => {
    const classes = [
      "drop-shadow-(--test)",
      "drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]",
      "drop-shadow-xs",
      "drop-shadow-sm",
      "drop-shadow",
      "drop-shadow-md",
      "drop-shadow-lg",
      "drop-shadow-xl",
      "drop-shadow-2xl",
      "drop-shadow-none",
    ] as const;

    expect(
      classes.map((c) => resolveDropShadow({ utility: c, config: defaults })),
    ).toMatchInlineSnapshot(`
      [
        {
          "properties": {
            "--tw-drop-shadow": "var(--tw-drop-shadow-size)",
            "--tw-drop-shadow-size": "drop-shadow(var(--test))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "var(--tw-drop-shadow-size)",
            "--tw-drop-shadow-size": "drop-shadow(0 35px 35px var(--tw-drop-shadow-color, rgba(0,0,0,0.25)))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "drop-shadow(var(--drop-shadow-xs))",
            "--tw-drop-shadow-size": "drop-shadow(0 1px 1px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.05)))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "drop-shadow(var(--drop-shadow-sm))",
            "--tw-drop-shadow-size": "drop-shadow(0 1px 2px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.15)))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
            "--tw-drop-shadow-size": "drop-shadow(0 1px 2px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.1))) drop-shadow(0 1px 1px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.06)))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "drop-shadow(var(--drop-shadow-md))",
            "--tw-drop-shadow-size": "drop-shadow(0 3px 3px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.12)))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "drop-shadow(var(--drop-shadow-lg))",
            "--tw-drop-shadow-size": "drop-shadow(0 4px 4px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.15)))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "drop-shadow(var(--drop-shadow-xl))",
            "--tw-drop-shadow-size": "drop-shadow(0 9px 7px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.1)))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "drop-shadow(var(--drop-shadow-2xl))",
            "--tw-drop-shadow-size": "drop-shadow(0 25px 25px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.15)))",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "",
            "filter": "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
          },
        },
      ]
    `);
  });

  it("should generate drop shadow color utilities", () => {
    const classes = [
      "drop-shadow-red-500",
      "drop-shadow-red-500/20",
      "drop-shadow-(color:--test)",
      "drop-shadow-(--test)/20",
      "drop-shadow-test",
    ] as const;

    expect(
      classes.map((c) =>
        resolveDropShadowColor({ utility: c, config: defaults }),
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "properties": {
            "--tw-drop-shadow": "var(--tw-drop-shadow-size)",
            "--tw-drop-shadow-color": "var(--color-red-500)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "var(--tw-drop-shadow-size)",
            "--tw-drop-shadow-color": "oklch(from var(--color-red-500) l c h / 20%)",
          },
        },
        {
          "properties": {
            "--tw-drop-shadow": "var(--tw-drop-shadow-size)",
            "--tw-drop-shadow-color": "var(--test)",
          },
        },
        null,
        null,
      ]
    `);
  });
});
