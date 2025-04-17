import { cfg, styled, type ConsooInstance } from "./core";

export function assert(condition?: boolean, ...data: any[]) {
  console.assert(condition, ...data);
}

export function clear() {
  console.clear();
}

export function count(label?: string) {
  console.count(label);
}

export function countReset(label?: string) {
  console.countReset(label);
}

export function dir(item?: any, options?: any) {
  console.dir(item, options);
}

export function dirxml(...data: any[]) {
  console.dirxml(...data);
}

export function group(...data: any[]) {
  console.group(...data);
}

export function groupCollapsed(...data: any[]) {
  console.groupCollapsed(...data);
}

export function groupEnd() {
  console.groupEnd();
}

export function table(tabularData: any, properties?: string[]) {
  console.table(tabularData, properties);
}

export function time(label?: string) {
  console.time(label);
}

export function timeEnd(label?: string) {
  console.timeEnd(label);
}

export function timeLog(label?: string, ...data: any[]) {
  console.timeLog(label, ...data);
}

export function timeStamp(label?: string) {
  console.timeStamp(label);
}

export function profile(label?: string) {
  console.profile(label);
}

export function profileEnd(label?: string) {
  console.profileEnd(label);
}

export function trace(...data: any[]) {
  console.trace(...styled("", ...data));
}

export function log(this: ConsooInstance, ...data: any[]) {
  console[cfg.logLevel](...styled(this.mark, ...data));
}

export function info(this: ConsooInstance, ...data: any[]) {
  console.info(...styled(this.mark, ...data));
}

export function warn(this: ConsooInstance, ...data: any[]) {
  console.warn(...styled(this.mark, ...data));
}

export function error(this: ConsooInstance, ...data: any[]) {
  console.error(...styled(this.mark, ...data));
}

export function debug(this: ConsooInstance, ...data: any[]) {
  console.debug(...styled(this.mark, ...data));
}

export function v(VConsoleInitOption?: { theme: "dark" | "light" }) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/vconsole@latest/dist/vconsole.min.js";
  document.body.appendChild(script);
  script.onload = () => {
    // @ts-ignore
    window.vConsole = new window.VConsole(VConsoleInitOption);
  };
}

export function pause(delay: number = 0) {
  setTimeout(() => {
    debugger;
  }, delay);
}

export function sep(repeator: string = "=", len: number = 80) {
  console[cfg.logLevel](
    `\n${cfg.prefix ? cfg.prefix + " " : ""}${repeator.repeat(Math.floor(len / repeator.length))}\n\n`,
  );
}

export function inspect<T>(data: T): T;
export function inspect<T>(mark: string | number, data: T): T;
export function inspect<T>(markOrData: string | number | T, data?: T): T {
  const mark = arguments.length === 1 ? "" : (markOrData as string | number);
  data = arguments.length === 1 ? (markOrData as T) : (data as T);
  console[cfg.logLevel](...styled(mark, data));
  return data;
}

export const traceFn = <F extends Function>(fn: F, ctx?: any): F =>
  function (this: any) {
    console.trace(
      ...styled(
        `[${fn.name || "anonymous"}] called with arguments:`,
        arguments,
      ),
    );
    return fn.apply(ctx || this, arguments);
  } as unknown as F;

export const traceProp = (obj: Record<string, unknown>, prop: string) => {
  let value = obj[prop];
  Object.defineProperty(obj, prop, {
    get() {
      console.trace(...styled(`prop [${prop}] requested`));
      return value;
    },
    set(newValue) {
      console.trace(...styled(`setting prop [${prop}] to:`, newValue));
      value = newValue;
    },
  });
};

export function monitorActiveElement() {
  if (window.__consoo_state.monitorActiveElementFlag) {
    return stopMonitorActiveElement;
  }
  window.__consoo_state.monitorActiveElementFlag = true;

  let activeElement = document.activeElement;
  window.__consoo_state.monitorActiveElementTimer = setInterval(() => {
    if (document.activeElement !== activeElement) {
      activeElement = document.activeElement;
      console[cfg.logLevel](...styled("document.activeElement:", activeElement));
    }
  }, 100);

  return stopMonitorActiveElement;
}

export function stopMonitorActiveElement() {
  window.__consoo_state.monitorActiveElementFlag = false;
  clearInterval(window.__consoo_state.monitorActiveElementTimer);
}
