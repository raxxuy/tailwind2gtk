import { existsSync, readFileSync, writeFileSync } from "node:fs";
import type { Plugin } from "../types";
import { createPlugin } from "./base";

export const nodePlugin = (
  options?: Plugin["options"],
  onUpdate?: () => void,
) =>
  createPlugin({
    name: "node",
    options,
    readFile: (path) => (existsSync(path) ? readFileSync(path, "utf-8") : null),
    writeFile: (path, content) => writeFileSync(path, content),
    onUpdate,
  });
