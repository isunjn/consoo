export type LogLevel = "info" | "warn" | "error" | "debug";

export type Color = {
  name: string;
  bg: string;
  fg: string;
};

export type InitOption = {
  noop?: boolean;
  alias?: string | string[];
  defaultLogLevel?: LogLevel;
  prefix?: string;
  colors?: Color[];
};

export type Config = {
  defaultLogLevel: LogLevel;
  color?: Color;
  style: Record<string, string>;
  mark: string | number | undefined;
  prefix: string;
  colors: Color[];
};

export type ConsooFns = {
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
};

export type ConsooInstance = ConsooFns & {
  cfg: Config;
};

export type Consoo = ConsooFns & {
  (mark: string | number): ConsooFns;
};
