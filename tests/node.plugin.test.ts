import { existsSync, rmSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { nodePlugin } from "../src/plugins/node";

const JSON_PATH = "tests/fixtures/utilities.json";
const CSS_PATH = "tests/fixtures/utilities.css";

beforeEach(() => {
  if (existsSync(JSON_PATH)) rmSync(JSON_PATH);
  if (existsSync(CSS_PATH)) rmSync(CSS_PATH);
});

afterEach(() => {
  if (existsSync(JSON_PATH)) rmSync(JSON_PATH);
  if (existsSync(CSS_PATH)) rmSync(CSS_PATH);
});

describe("nodePlugin", () => {
  it("generates css and json on first run", () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });
    plugin.run(["p-4"]);

    expect(existsSync(JSON_PATH)).toBe(true);
    expect(existsSync(CSS_PATH)).toBe(true);
  });

  it("caches classes and skips regeneration", () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });
    plugin.run(["p-4"]);
    const firstCSS = existsSync(CSS_PATH);

    plugin.run(["p-4"]);
    const secondCSS = existsSync(CSS_PATH);

    expect(firstCSS).toBe(secondCSS);
  });

  it("adds new classes to existing cache", () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });
    plugin.run(["p-4"]);
    plugin.run(["m-4"]);

    const cache = JSON.parse(
      require("node:fs").readFileSync(JSON_PATH, "utf-8"),
    );
    expect(cache).toHaveProperty("p-4");
    expect(cache).toHaveProperty("m-4");
  });

  it("css file contains all cached classes", () => {
    const plugin = nodePlugin({ jsonPath: JSON_PATH, cssPath: CSS_PATH });
    plugin.run(["p-4", "m-4"]);

    const css = require("node:fs").readFileSync(CSS_PATH, "utf-8");
    expect(css).toContain(".p-4");
    expect(css).toContain(".m-4");
  });
});
