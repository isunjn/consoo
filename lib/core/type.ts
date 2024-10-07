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
  mark: string | undefined;
  offset: number;
  prefix: string;
  colors: Color[];
};

export type ConsooInterface = {
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

export type ConsooInstance = ConsooInterface & {
  cfg: Config;
};

export type Consoo = ConsooInterface & {
  (mark: string, offset?: number): ConsooInterface;
};
