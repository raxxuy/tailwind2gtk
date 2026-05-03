import { existsSync, readFileSync, writeFile } from "node:fs";
import type { Plugin } from "../types";
import { createPlugin } from "./base";

export const nodePlugin = (options?: Plugin["options"]): Plugin =>
  createPlugin({
    name: "node",
    options,
    readFile: (path) => (existsSync(path) ? readFileSync(path, "utf-8") : null),
    writeFile: (path, content) =>
      new Promise((resolve, reject) => {
        writeFile(path, content, "utf-8", (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }),
  });
