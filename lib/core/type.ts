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
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;

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

  inspect: {
    <T>(data: T): T;
    <T>(mark: string | number, data: T): T;
  };
};

export type ConsooInstance = ConsooFns & {
  cfg: Config;
};

export type Consoo = ConsooFns & {
  (mark: string | number): ConsooFns;
};
