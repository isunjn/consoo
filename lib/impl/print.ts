import type { Config, ConsooInstance, LogLevel } from "../core/type";

const hash = (input: string, max: number) => {
  let hashed = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hashed = (hashed << 5) - hashed + char;
    hashed |= 0; // Convert to 32bit integer
  }
  return Math.abs(hashed) % max;
};

const print = (cfg: Config, level: LogLevel, args: any[]) => {
  let { prefix, color, style, mark, offset, colors } = cfg;

  if (mark) {
    color = color ?? colors[hash(mark, colors.length)];
    style = {
      background: color.bg,
      color: color.fg,
      ...style,
    };
  }
  const styleStr = Object.entries(style)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

  const prefixPart = prefix ? `${prefix} ` : "";
  const offsetPart = "=> ".repeat(offset);
  const markPart = `%c${mark}\x1B[m`;
  const formattar = `${prefixPart}${offsetPart}${markPart}`;

  console[level](formattar, styleStr, ...args);
};

export function log(this: ConsooInstance, ...args: any[]) {
  print(this.cfg, this.cfg.defaultLogLevel, args);
}

export function info(this: ConsooInstance, ...args: any[]) {
  print(this.cfg, "info", args);
}

export function warn(this: ConsooInstance, ...args: any[]) {
  print(this.cfg, "warn", args);
}

export function error(this: ConsooInstance, ...args: any[]) {
  print(this.cfg, "error", args);
}

export function debug(this: ConsooInstance, ...args: any[]) {
  print(this.cfg, "debug", args);
}
