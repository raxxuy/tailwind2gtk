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
  const cleanups = new Map<Gtk.Widget, () => void>();
  let connected = new WeakSet<Gtk.Widget>();

  const scanWidget = (widget: Gtk.Widget): string[] => {
    const classes = [...(widget.get_css_classes() as string[])];

    if (!connected.has(widget)) {
      connected.add(widget);

      const handlerId = widget.connect("notify::css-classes", () => {
        plugin.run(scanWidget(widget));
      });

      cleanups.set(widget, () => {
        widget.disconnect(handlerId);
        connected.delete(widget);
        cleanups.delete(widget);
      });
    }

    let child = widget.get_first_child();
    while (child) {
      classes.push(...scanWidget(child));
      child = child.get_next_sibling();
    }

    return classes;
  };

  const unscanWidget = (widget: Gtk.Widget) => {
    const cleanup = cleanups.get(widget);
    if (cleanup) cleanup();

    let child = widget.get_first_child();
    while (child) {
      unscanWidget(child);
      child = child.get_next_sibling();
    }
  };

  onCleanup(() => {
    cleanups.forEach((cleanup) => {
      cleanup();
    });
    cleanups.clear();
    connected = new WeakSet();
  });

  return {
    ...plugin,
    scan: (root: Gtk.Widget) => plugin.run(scanWidget(root)),
    unscan: unscanWidget,
    cleanupWidget: (widget: GObject.Object) =>
      unscanWidget(widget as Gtk.Widget),
  };
};
