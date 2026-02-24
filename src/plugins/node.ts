import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { type CoreOptions, createCore } from "../core";

type NodeOptions = Omit<CoreOptions, "readFile" | "writeFile" | "fileExists">;

export const createNodeCore = (options: NodeOptions) => {
  return createCore({
    ...options,
    readFile: (path) => readFileSync(path, "utf-8"),
    writeFile: (path, content) => writeFileSync(path, content, "utf-8"),
    fileExists: (path) => existsSync(path),
  });
};
