import * as helpers from "./impl";

declare global {
  interface Window {
    __consoo_state: Record<string, any>;
  }
}

type LogLevel = "info" | "warn" | "error" | "debug";

type Color = {
  bg: string;
  fg: string;
};

type InitOption = {
  noop?: boolean;
  alias?: string | string[];
  defaultLogLevel?: LogLevel;
  prefix?: string;
  markStyle: Record<string, string>;
  markColors?: Color[];
};

type Config = {
  level: LogLevel;
  prefix?: string;
  markStyle: Record<string, string>;
  markColors: Color[];
};

type ConsooFns = {
  log: (...data: any[]) => void;
  info: (...data: any[]) => void;
  warn: (...data: any[]) => void;
  error: (...data: any[]) => void;
  debug: (...data: any[]) => void;
  assert: (condition?: boolean, ...data: any[]) => void;
  clear: () => void;
  count: (label?: string) => void;
  countReset: (label?: string) => void;
  dir: (item?: any, options?: any) => void;
  dirxml: (...data: any[]) => void;
  group: (...data: any[]) => void;
  groupCollapsed: (...data: any[]) => void;
  groupEnd: () => void;
  table: (tabularData: any, properties?: string[]) => void;
  time: (label?: string) => void;
  timeEnd: (label?: string) => void;
  timeLog: (label?: string, ...data: any[]) => void;
  timeStamp: (label?: string) => void;
  trace: (...data: any[]) => void;
  profile: (label?: string) => void;
  profileEnd: (label?: string) => void;

  v: (VConsoleInitOption?: { theme: "dark" | "light" }) => void;
  pause: (delay?: number) => void;
  sep: (repeator?: string, len?: number) => void;
  inspect: {
    <T>(data: T): T;
    <T>(mark: string | number, data: T): T;
  };
  traceFn: <F extends Function>(fn: F, ctx?: any) => F;
  traceProp: (obj: Record<string, unknown>, prop: string) => void;
  monitorActiveElement: () => void;
  stopMonitorActiveElement: () => void;
};

export type ConsooInstance = ConsooFns & {
  mark?: string | number;
};

export type Consoo = ConsooFns & {
  (mark: string | number): ConsooFns;
};

export const cfg: Config = {
  level: "info",
  prefix: undefined,
  markStyle: {
    padding: "2px",
  },
  markColors: [
    { bg: "#5151db", fg: "#fff" },
    { bg: "#5cc290", fg: "#fff" },
    { bg: "#860418", fg: "#fff" },
    { bg: "#dddddd", fg: "#000" },
    { bg: "#000000", fg: "#fff" },
    { bg: "#555555", fg: "#fff" },
    { bg: "#ff664d", fg: "#fff" },
    { bg: "#d4b475", fg: "#fff" },
    { bg: "#8f5465", fg: "#fff" },
    { bg: "#3fffff", fg: "#000" },
    { bg: "#7f4ac3", fg: "#fff" },
    { bg: "#fc9cff", fg: "#fff" },
  ],
};

export const init = (option?: InitOption) => {
  const {
    noop = false,
    alias = [],
    defaultLogLevel = "info",
    prefix,
    markStyle = cfg.markStyle,
    markColors = cfg.markColors,
  } = option || {};

  if (noop) {
    // TODO: make a no-op consoo instance
  }

  cfg.level = defaultLogLevel;
  cfg.prefix = prefix;
  cfg.markStyle = markStyle;
  cfg.markColors = markColors;

  const make = (mark?: string | number): ConsooInstance => ({
    mark,
    ...helpers,
  });

  const consoo = (mark?: string | number) => make(mark);
  Object.assign(consoo, make());

  const names = Array.isArray(alias) ? alias : [alias];
  ["consoo", ...names].forEach((name) => {
    // @ts-ignore
    window[name] = window[name] || (consoo as Consoo);
  });
  window.__consoo_state = {};
};

const hash = (input: string | number, max: number) => {
  input = String(input);
  let hashed = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hashed = (hashed << 5) - hashed + char;
    hashed |= 0; // Convert to 32bit integer
  }
  return Math.abs(hashed) % max;
};

export const styled = (mark: string | number | undefined, ...data: any[]) => {
  const { prefix, markStyle, markColors } = cfg;
  let args = prefix ? [prefix, ...data] : data;
  if (mark !== undefined && mark !== "") {
    const color = markColors[hash(mark, markColors.length)];
    const style = Object.entries({
      background: color.bg,
      color: color.fg,
      ...markStyle,
    })
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
    const format = `${prefix ? prefix + " " : ""}${`%c ${mark} %c`}`;
    args = [format, style, "", ...data];
  }
  return args;
};
