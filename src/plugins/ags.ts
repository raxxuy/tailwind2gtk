import Gio from "gi://Gio";
import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
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

const writeFile = (path: string, content: string): void => {
  const file = Gio.File.new_for_path(path);
  const bytes = new TextEncoder().encode(content);
  file.replace_contents_async(
    bytes,
    null,
    false,
    Gio.FileCreateFlags.REPLACE_DESTINATION,
    null,
    null,
  );
};

export const agsPlugin = (
  options?: Plugin["options"],
  onUpdate?: () => void,
): Plugin => {
  const plugin = createPlugin({
    name: "ags",
    options,
    readFile,
    writeFile,
    onUpdate,
  });

  const traverseWidget = (self: Gtk.Widget): string[] => {
    const classes = self.get_css_classes();

    const childClasses: string[] = [];
    let child = self.get_first_child();
    while (child) {
      childClasses.push(...traverseWidget(child));
      child = child.get_next_sibling();
    }

    return [...classes, ...childClasses];
  };

  return {
    ...plugin,
    setup: (self: Gtk.Widget) => {
      plugin.run(traverseWidget(self));

      const handler = self.connect("notify::css-classes", () =>
        plugin.run(traverseWidget(self)),
      );

      onCleanup(() => self.disconnect(handler));
    },
    scan: (root: Gtk.Widget) => {
      plugin.run(traverseWidget(root));
    },
  };
};
