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

  let args = data;
  if (prefix) {
    args = [prefix, ...data];
  }
  if (mark) {
    const markStyle = Object.entries(style)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
    const resetStyle = "";
    const formattar = `${prefix}${prefix ? " " : ""}${`%c ${mark} %c`}`;
    args = [formattar, markStyle, resetStyle, ...data];
  }

  console[level](...args);
};
