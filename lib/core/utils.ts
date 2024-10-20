import type { Color, Config, LogLevel } from "./type";

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

export const print = (
  cfg: Config,
  data: any[],
  override: {
    prefix?: string;
    level?: LogLevel;
    mark?: string | number;
    color?: Color;
    style?: Record<string, string>;
  } = {},
) => {
  const level = override.level || cfg.defaultLogLevel;
  const prefix = override.prefix || cfg.prefix;
  const mark = override.mark || cfg.mark || "";
  const color =
    override.color || cfg.color || cfg.colors[hash(mark, cfg.colors.length)];
  const style = {
    background: color.bg,
    color: color.fg,
    ...cfg.style,
    ...override.style,
  };

  const styleStr = Object.entries(style)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

  const prefixPart = prefix ? `${prefix} ` : "";
  const markPart = `%c${mark}\x1B[m`;
  const formattar = `${prefixPart}${markPart}`;

  console[level](formattar, styleStr, ...data);
};
