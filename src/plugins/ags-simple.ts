import GLib from "gi://GLib";
import { type AgsOptions, createAgsPlugin } from "./ags";

type SimpleAgsOptions = Omit<
  AgsOptions,
  "readFile" | "writeFile" | "fileExists"
>;

export const createSimpleAgsPlugin = (options: SimpleAgsOptions) => {
  return createAgsPlugin({
    ...options,
    readFile: (path) => {
      const [, contents] = GLib.file_get_contents(path);
      return new TextDecoder().decode(contents);
    },
    writeFile: (path, content) => GLib.file_set_contents(path, content),
    fileExists: (path) => GLib.file_test(path, GLib.FileTest.EXISTS),
  });
};
