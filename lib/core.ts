import * as helpers from "./impl";

declare global {
  interface Window {
    __consoo_state: {
      monitorActiveElementFlag?: boolean;
      monitorActiveElementTimer?: number;
    };
  }
  interface Console {
    profile: (label?: string) => void;
    profileEnd: (label?: string) => void;
  }
}

type LogLevel = "info" | "warn" | "error" | "debug";

interface Color {
  bg: string;
  fg: string;
}

interface InitOption {
  noop?: boolean;
  alias?: string | string[];
  defaultLogLevel?: LogLevel;
  prefix?: string;
  markStyle?: Record<string, string>;
  markColors?: Color[];
}

interface Config {
  logLevel: LogLevel;
  prefix?: string;
  markStyle: Record<string, string>;
  markColors: Color[];
}

interface ConsooFns {
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
     * Print and return as is
     * @param data - The expression to inspect
     */
    <T>(data: T): T;
    /**
     * Print and return as is
     * @param mark - A string or number to be printed with colors
     * @param data - The expression to inepect
     */
    <T>(mark: string | number, data: T): T;
  };

  /**
   * Create a new version of the input function that will call console.trace() when called
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
}

export interface ConsooInstance extends ConsooFns {
  mark?: string | number;
}

export interface Consoo extends ConsooFns {
  /**
   * Create a new consoo instance with a mark
   * @param mark - A string or number to be printed with colors
   */
  (mark: string | number): ConsooFns;
}

export const cfg: Config = {
  logLevel: "info",
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

  cfg.logLevel = defaultLogLevel;
  cfg.prefix = prefix;
  cfg.markStyle = markStyle;
  cfg.markColors = markColors;

  const make = (mark?: string | number): ConsooInstance => {
    if (noop) {
      return Object.fromEntries(Object.keys(helpers).map((fn) => [fn, () => {}])) as unknown as ConsooInstance;
    }
    return {
      mark: mark,
      ...helpers,
    };
  }

  const consoo = (mark?: string | number) => make(mark);
  Object.assign(consoo, make());

  const names = Array.isArray(alias) ? alias : [alias];
  // @ts-ignore
  names.forEach(name => window[name] = consoo);

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
