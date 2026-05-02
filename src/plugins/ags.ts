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

  const traverseWidget = (self: Gtk.Widget): Set<string> => {
    const classes = new Set(self.get_css_classes() as string[]);
    let child = self.get_first_child();
    while (child) {
      for (const cls of traverseWidget(child)) classes.add(cls);
      child = child.get_next_sibling();
    }
    return classes;
  };

  const pending = new Set<string>();
  const lastSeenClasses = new Set<string>();
  let setupCount = 0;

  const flush = debounce(async () => {
    if (pending.size === 0) return;
    await plugin.run([...pending]);
    pending.clear();
  }, 0);

  const scheduleFlush = (root: Gtk.Widget) => {
    const current = traverseWidget(root);
    const newClasses = [...current].filter((cls) => !lastSeenClasses.has(cls));

    if (newClasses.length === 0) return;

    for (const cls of newClasses) {
      lastSeenClasses.add(cls);
      pending.add(cls);
    }

    flush();
  };

  return {
    ...plugin,
    setup: (self: Gtk.Widget) => {
      setupCount++;
      scheduleFlush(self);

      const handler = self.connect("notify::css-classes", () =>
        scheduleFlush(self),
      );

      onCleanup(() => {
        self.disconnect(handler);
        if (--setupCount === 0) flush.cancel();
      });
    },
    scan: (root: Gtk.Widget) => scheduleFlush(root),
  };
};
