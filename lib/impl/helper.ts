import type { ConsooInstance } from "../core/type";
import { print } from "../core/utils";

export function v(VConsoleInitOption?: { theme: "dark" | "light" }) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/vconsole@latest/dist/vconsole.min.js";
  document.body.appendChild(script);
  script.onload = () => {
    // @ts-expect-error
    window.vConsole = new window.VConsole(VConsoleInitOption);
  };
}

export function pause(delay?: number) {
  if (typeof delay !== "number") {
    debugger;
    return;
  }
  setTimeout(() => {
    debugger;
  }, delay);
}

export function sep(this: ConsooInstance, repeator?: string, len?: number) {
  const level = this.cfg.defaultLogLevel;
  const prefix = this.cfg.prefix;
  repeator = repeator || "=";
  len = len || 80;
  console[level](
    `\n${prefix}${prefix ? " " : ""}${repeator.repeat(Math.ceil(len / repeator.length)).slice(0, len)}\n\n`,
  );
}

export function inspect<T>(this: ConsooInstance, data: T): T;
export function inspect<T>(
  this: ConsooInstance,
  mark: string | number,
  data: T,
): T;
export function inspect<T>(
  this: ConsooInstance,
  markOrData: string | number | T,
  data?: T,
): T {
  const mark = arguments.length === 1 ? "" : (markOrData as string | number);
  data = arguments.length === 1 ? (markOrData as T) : (data as T);

  print(this.cfg, [data], {
    mark,
    style: {
      ["border-radius"]: "9999px",
    },
  });

  return data;
}

export const traceFn = <F extends Function>(fn: F, ctx?: any): F =>
  function (this: any) {
    console.trace(`${fn.name} called with arguments: `, arguments);
    return fn.apply(ctx || this, arguments);
  } as unknown as F;

export const traceProp = (obj: Record<string, unknown>, prop: string) => {
  let value = obj[prop];
  Object.defineProperty(obj, prop, {
    get() {
      console.trace(`${prop} requested`);
      return value;
    },
    set(newValue) {
      console.trace(`setting ${prop} to`, newValue);
      value = newValue;
    },
  });
};
