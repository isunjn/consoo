import type { ConsooInstance } from "../core/type";
import { print } from "../core/utils";

export function log(this: ConsooInstance, ...data: any[]) {
  print(this.cfg, data);
}

export function info(this: ConsooInstance, ...data: any[]) {
  print(this.cfg, data, { level: "info" });
}

export function warn(this: ConsooInstance, ...data: any[]) {
  print(this.cfg, data, { level: "warn" });
}

export function error(this: ConsooInstance, ...data: any[]) {
  print(this.cfg, data, { level: "error" });
}

export function debug(this: ConsooInstance, ...data: any[]) {
  print(this.cfg, data, { level: "debug" });
}
