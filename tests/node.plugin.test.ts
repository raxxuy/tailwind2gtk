import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { nodePlugin } from "@/plugins/node";

const JSON_PATH = "tests/fixtures/utilities.json";
const CSS_PATH = "tests/fixtures/utilities.css";
const THEME_PATH = "tests/fixtures/theme.css";
const EXTEND_PATH = "tests/fixtures/extend.css";

beforeEach(() => {
  if (!existsSync("tests/fixtures")) mkdirSync("tests/fixtures");
  if (existsSync(JSON_PATH)) rmSync(JSON_PATH);
  if (existsSync(CSS_PATH)) rmSync(CSS_PATH);
  if (existsSync(THEME_PATH)) rmSync(THEME_PATH);
});

afterEach(() => {
  if (existsSync(JSON_PATH)) rmSync(JSON_PATH);
  if (existsSync(CSS_PATH)) rmSync(CSS_PATH);
  if (existsSync(THEME_PATH)) rmSync(THEME_PATH);
});

const defaultPlugin = nodePlugin({
  jsonPath: JSON_PATH,
  cssPath: CSS_PATH,
  themePath: THEME_PATH,
});

describe("generate css", () => {
  it("generates a few css rules", async () => {
    await defaultPlugin.run([
      "min-h-4",
      "m-3",
      "space-x-8",
      "hover:p-[4px]",
      "[&:nth-child(-n+3)]:hover:font-mono",
      "text-[7px]",
    ]);
    const css = readFileSync(CSS_PATH, "utf-8");
    expect(css).toContain(`
.min-h-4 {
  min-height: calc(var(--spacing) * 4);
}
.m-3 {
  margin: calc(var(--spacing) * 3);
}
.space-x-8 {
  & > :not(:last-child) {
    --tw-space-x-reverse: 0;
    margin-left: calc(calc(var(--spacing) * 8) * var(--tw-space-x-reverse));
    margin-right: calc(calc(var(--spacing) * 8) * calc(1 - var(--tw-space-x-reverse)));
  }
}
.hover\\:p-\\[4px\\] {
  &:hover {
    padding: 4px;
  }
}
.\\[\\&\\:nth-child\\(-n\\+3\\)\\]\\:hover\\:font-mono {
  &:nth-child(-n+3) {
    &:hover {
      font-family: var(--font-mono);
    }
  }
}
.text-\\[7px\\] {
  font-size: 7px;
}`);
  });

  it("generates a selector", async () => {
    await defaultPlugin.run(["**:hover:underline"]);
    const css = readFileSync(CSS_PATH, "utf-8");
    expect(css).toContain(`
.\\*\\*\\:hover\\:underline {
  & * {
    &:hover {
      text-decoration-line: underline;
    }
  }
}`);
  });

  it("generates defined variables", async () => {
    await defaultPlugin.run([
      "text-7xl",
      "min-w-3xs",
      "leading-tight",
      "rounded",
      "rounded-md",
    ]);
    const css = readFileSync(CSS_PATH, "utf-8");
    expect(css).toContain(`
.text-7xl {
  font-size: var(--text-7xl);
  line-height: var(--tw-leading, var(--text-7xl--line-height));
}
.min-w-3xs {
  min-width: var(--container-3xs);
}
.leading-tight {
  --tw-leading: var(--leading-tight);
  line-height: var(--leading-tight);
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-md {
  border-radius: var(--radius-md);
}`);
  });
});
