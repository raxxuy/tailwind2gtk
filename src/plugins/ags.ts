import Gio from "gi://Gio";
import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { debounce } from "es-toolkit";
import type { Plugin } from "../types";
import { createPlugin } from "./base";

const readFile = (path: string): string | null => {
  try {
    const file = Gio.File.new_for_path(path);
    const [, contents] = file.load_contents(null);
    return new TextDecoder().decode(contents);
  } catch {
    return null;
  }
};

const writeFile = (path: string, content: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const file = Gio.File.new_for_path(path);
    const bytes = new TextEncoder().encode(content);
    file.replace_contents_async(
      bytes,
      null,
      false,
      Gio.FileCreateFlags.REPLACE_DESTINATION,
      null,
      (_: Gio.File, result: Gio.AsyncResult) => {
        try {
          file.replace_contents_finish(result);
          resolve();
        } catch (e) {
          reject(e);
        }
      },
    );
  });

export const agsPlugin = (options?: Plugin["options"]): Plugin => {
  const plugin = createPlugin({ name: "ags", options, readFile, writeFile });
  let setupCount = 0;

  const collectClasses = (widget: Gtk.Widget): string[] => {
    const classes = [...(widget.get_css_classes() as string[])];
    let child = widget.get_first_child();
    while (child) {
      classes.push(...collectClasses(child));
      child = child.get_next_sibling();
    }
    return classes;
  };

  const run = debounce(
    (widget: Gtk.Widget) => plugin.run(collectClasses(widget)),
    16,
  );

  return {
    ...plugin,
    setup: (self: Gtk.Widget) => {
      setupCount++;
      run(self);

      const handler = self.connect("notify::css-classes", () => run(self));

      onCleanup(() => {
        self.disconnect(handler);
        if (--setupCount === 0) run.cancel();
      });
    },
    scan: (root: Gtk.Widget) => plugin.run(collectClasses(root)),
  };
};
