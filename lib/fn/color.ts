import { getConsooFn } from "../core";

const bg = (color: string) => {
  const fn = getConsooFn();
  fn.cfg.style.bg = color;
  if (!fn.cfg.style.fg) {
    fn.cfg.style.fg = '#fff';
  }
  return fn;
};

const fg = (color: string) => {
  const fn = getConsooFn();
  fn.cfg.style.fg = color;
  return fn;
};

const slate = () => bg('#64748b');
const gray = () => bg('#6b7280');
const zinc = () => bg('#71717a');
const neutral = () => bg('#737373');
const stone = () => bg('#78716c');
const red = () => bg('#ef4444');
const orange = () => bg('#f97316');
const amber = () => bg('#f59e0b');
const yellow = () => bg('#eab308');
const lime = () => bg('#84cc16');
const green = () => bg('#22c55e');
const emerald = () => bg('#10b981');
const teal = () => bg('#14b8a6');
const cyan = () => bg('#06b6d4');
const sky = () => bg('#0ea5e9');
const blue = () => bg('#3b82f6');
const indigo = () => bg('#6366f1');
const violet = () => bg('#8b5cf6');
const purple = () => bg('#a855f7');
const fuchsia = () => bg('#d946ef');
const pink = () => bg('#ec4899');
const rose = () => bg('#f43f5e');

const fgSlate = () => fg('#64748b');
const fgGray = () => fg('#6b7280');
const fgZinc = () => fg('#71717a');
const fgNeutral = () => fg('#737373');
const fgStone = () => fg('#78716c');
const fgRed = () => fg('#ef4444');
const fgOrange = () => fg('#f97316');
const fgAmber = () => fg('#f59e0b');
const fgYellow = () => fg('#eab308');
const fgLime = () => fg('#84cc16');
const fgGreen = () => fg('#22c55e');
const fgEmerald = () => fg('#10b981');
const fgTeal = () => fg('#14b8a6');
const fgCyan = () => fg('#06b6d4');
const fgSky = () => fg('#0ea5e9');
const fgBlue = () => fg('#3b82f6');
const fgIndigo = () => fg('#6366f1');
const fgViolet = () => fg('#8b5cf6');
const fgPurple = () => fg('#a855f7');
const fgFuchsia = () => fg('#d946ef');
const fgPink = () => fg('#ec4899');
const fgRose = () => fg('#f43f5e');

export default {
  bg,
  fg,
  slate,
  gray,
  zinc,
  neutral,
  stone,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  fgSlate,
  fgGray,
  fgZinc,
  fgNeutral,
  fgStone,
  fgRed,
  fgOrange,
  fgAmber,
  fgYellow,
  fgLime,
  fgGreen,
  fgEmerald,
  fgTeal,
  fgCyan,
  fgSky,
  fgBlue,
  fgIndigo,
  fgViolet,
  fgPurple,
  fgFuchsia,
  fgPink,
  fgRose,
};
