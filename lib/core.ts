import * as helpers from "./impl";

declare global {
  interface Window {
    __consoo_state: Record<string, any>;
  }
  interface Console {
    profile: (label?: string) => void;
    profileEnd: (label?: string) => void;
  }
}

type LogLevel = "info" | "warn" | "error" | "debug";

type Color = {
  bg: string;
  fg: string;
};

export type InitOption = {
  noop?: boolean;
  alias?: string | string[];
  defaultLogLevel?: LogLevel;
  prefix?: string;
  markStyle?: Record<string, string>;
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

  /**
   * Load and initialize [vConsole](https://github.com/Tencent/vConsole)
   * @param VConsoleInitOption - Options for vConsole
   */
  v: (VConsoleInitOption?: { theme: "dark" | "light" }) => void;
  /**
   * Pause the execution with a debugger after {delay} ms
   * @param delay - The delay in milliseconds, defalut is 0
   */
  pause: (delay?: number) => void;
  /**
   * Print a separator line
   * @param repeator - The character to repeat, default is '='
   * @param len - The length of the line, default is 80
   */
  sep: (repeator?: string, len?: number) => void;
  inspect: {
    /**
     * Print and return
     * @param data - The expression to inspect
     */
    <T>(data: T): T;
    /**
     * Print and return
     * @param mark - A string or number to be printed with colors
     * @param data - The expression to inepect
     */
    <T>(mark: string | number, data: T): T;
  };
  /**
   * Create a new version of the input function that will console.trace() when called
   * @param fn - The function to trace
   * @param ctx - The context to bind to
   */
  traceFn: <F extends Function>(fn: F, ctx?: any) => F;
  /**
   * Trace the get() and set() of an object property
   * @param obj - The object to trace
   * @param prop - The property name
   */
  traceProp: (obj: Record<string, unknown>, prop: string) => void;
  /**
   * Monitor the active element in the document
   * @return A function to stop monitoring
   */
  monitorActiveElement: () => () => void;
  /**
   * Stop monitoring the active element in the document
   */
  stopMonitorActiveElement: () => void;
};

export type ConsooInstance = ConsooFns & {
  mark?: string | number;
};

export type Consoo = ConsooFns & {
  /**
   * Create a new consoo instance with a mark
   * @param mark - A string or number to be printed with colors
   */
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
    alias = "consoo",
    defaultLogLevel = "info",
    prefix,
    markStyle = cfg.markStyle,
    markColors = cfg.markColors,
  } = option || {};

  cfg.level = defaultLogLevel;
  cfg.prefix = prefix;
  cfg.markStyle = markStyle;
  cfg.markColors = markColors;

  const make = (mark?: string | number): ConsooInstance =>
    noop
      ? (Object.fromEntries(
          Object.keys(helpers).map((fn) => [fn, () => {}]),
        ) as any)
      : {
          mark,
          ...helpers,
        };

  const consoo = (mark?: string | number) => make(mark);
  Object.assign(consoo, make());

  const names = Array.isArray(alias) ? alias : [alias];
  names.forEach((name) => {
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
