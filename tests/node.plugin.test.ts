import { existsSync, readFileSync, rmSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { nodePlugin } from "../src/plugins/node";

const JSON_PATH = "tests/fixtures/utilities.json";
const CSS_PATH = "tests/fixtures/utilities.css";
const THEME_PATH = "tests/fixtures/theme.css";
const RESOLVE_VARS_FROM = "tests/fixtures/resolve-vars.css";

beforeEach(() => {
  if (existsSync(JSON_PATH)) rmSync(JSON_PATH);
  if (existsSync(CSS_PATH)) rmSync(CSS_PATH);
  if (existsSync(THEME_PATH)) rmSync(THEME_PATH);
});

afterEach(() => {
  if (existsSync(JSON_PATH)) rmSync(JSON_PATH);
  if (existsSync(CSS_PATH)) rmSync(CSS_PATH);
  if (existsSync(THEME_PATH)) rmSync(THEME_PATH);
});

describe("gradient utilities", () => {
  it("generates linear gradient classes", async () => {
    const plugin = nodePlugin({
      jsonPath: JSON_PATH,
      cssPath: CSS_PATH,
      themePath: THEME_PATH,
      tailwindConfig: {
        theme: {
          colors: {
            primary: "var(--primary)",
          },
        },
      },
      resolveVarsFrom: RESOLVE_VARS_FROM,
    });

    await plugin.run([
      "bg-linear-to-r",
      "bg-linear-to-t",
      "bg-linear-to-bl",
      "bg-linear-65",
    ]);

    const css = readFileSync(CSS_PATH, "utf-8");

    expect(css).toContain(".bg-linear-to-r");
    expect(css).toContain(".bg-linear-to-t");
    expect(css).toContain(".bg-linear-to-bl");
    expect(css).toContain(".bg-linear-65");
  });

  it("generates radial gradient classes", async () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });

    await plugin.run([
      "bg-radial",
      "bg-radial-[at_50%_75%]",
      "bg-radial-[at_25%_25%]",
    ]);

    const css = readFileSync(CSS_PATH, "utf-8");

    expect(css).toContain(".bg-radial");
    expect(css).toContain(".bg-radial-\\[at_50\\%_75\\%\\]");
    expect(css).toContain(".bg-radial-\\[at_25\\%_25\\%\\]");
  });

  it("generates conic gradient classes", async () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });

    await plugin.run(["bg-conic", "bg-conic-180", "bg-conic/decreasing"]);

    const css = readFileSync(CSS_PATH, "utf-8");

    expect(css).toContain(".bg-conic");
    expect(css).toContain(".bg-conic-180");
    expect(css).toContain(".bg-conic\\/decreasing");
  });

  it("handles gradient color stops with positions", async () => {
    const plugin = nodePlugin({
      jsonPath: JSON_PATH,
      cssPath: CSS_PATH,
    });

    await plugin.run([
      "from-indigo-500",
      "from-10%",
      "via-sky-500",
      "via-30%",
      "to-emerald-500",
      "to-90%",
    ]);

    const css = readFileSync(CSS_PATH, "utf-8");

    expect(css).toContain(".from-indigo-500");
    expect(css).toContain(".from-10\\%");
    expect(css).toContain(".via-sky-500");
    expect(css).toContain(".via-30\\%");
    expect(css).toContain(".to-emerald-500");
    expect(css).toContain(".to-90\\%");
  });

  it("handles arbitrary gradient values", async () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });

    await plugin.run([
      "bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]",
      "bg-linear-(--my-gradient)",
    ]);

    const css = readFileSync(CSS_PATH, "utf-8");

    expect(css).toContain(
      ".bg-linear-\\[25deg\\,red_5\\%\\,yellow_60\\%\\,lime_90\\%\\,teal\\]",
    );
    expect(css).toContain(".bg-linear-\\(--my-gradient\\)");
  });

  it("stores all gradient classes in cache", async () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });

    const classes = [
      "bg-linear-to-r",
      "bg-radial",
      "bg-conic",
      "from-pink-400",
      "to-fuchsia-700",
    ];

    await plugin.run(classes);

    const cache = JSON.parse(readFileSync(JSON_PATH, "utf-8"));

    for (const cls of classes) {
      expect(cache).toHaveProperty(cls);
    }
  });

  it("does not duplicate cached gradient classes", async () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });

    await plugin.run(["bg-linear-to-r"]);
    const first = readFileSync(JSON_PATH, "utf-8");

    await plugin.run(["bg-linear-to-r"]);
    const second = readFileSync(JSON_PATH, "utf-8");

    expect(first).toBe(second);
  });

  it("handles apply classes", async () => {
    const plugin = nodePlugin({
      jsonPath: JSON_PATH,
      cssPath: CSS_PATH,
      tailwindConfig: {
        theme: {
          apply: {
            "gradient-btn": [
              "bg-linear-to-r",
              "from-pink-400",
              "to-fuchsia-700",
            ],
          },
        },
      },
    });

    await plugin.run(["gradient-btn"]);
    const css = readFileSync(CSS_PATH, "utf-8");

    expect(css).toContain(
      `.gradient-btn {
  background-image: linear-gradient(to right, var(--gradient-stops));
  --gradient-from: var(--color-pink-400);
  --gradient-to: var(--color-fuchsia-700);
}`,
    );
  });
});
