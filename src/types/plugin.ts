import type { Object as GObject } from "ags/gobject";
import type { Gtk } from "ags/gtk4";
import type { CacheOptions } from "./config";

export interface Plugin {
  cleanupWidget?: (widget: GObject) => void;
  name: string;
  options?: Omit<CacheOptions, "readFile" | "writeFile">;
  readFile: (path: string) => string | null;
  run: (classes: string[]) => Promise<void>;
  scan?: (root: Gtk.Widget) => void;
  unscan?: (root: Gtk.Widget) => void;
  writeFile: (path: string, content: string) => Promise<void>;
}
