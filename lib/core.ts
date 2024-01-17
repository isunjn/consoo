import consoo from "./index";

export const defaultCfg = {
  noop: false,
  style: { },
};


type InitOption = {
  noop?: boolean;
  name?: string | string[];
  global?: boolean;
};

export const init = (option?: InitOption) => {
  const {
    noop = false,
    name = "consoo",
    global = true,
  } = option || {};

  if (noop) {
    defaultCfg.noop = true;
  }

  if (global) {
    const names = Array.isArray(name) ? name : [name];
    names.forEach(name => {
      // @ts-expect-error
      window[name] = window[name] || consoo;
    });
  }
};


type ConsooFn = {
  (...args: any[]): void;
  cfg: {
    noop: boolean;
    style: {
      bg?: string;
      fg?: string;
    };
  };
};

export const getConsooFn = () => {
  function fn(...args: any[]) {
    const cfg = (fn as ConsooFn).cfg;
    if (cfg.noop) return;
    const style = cfg.style;
    const bg = style.bg ? `background-color: ${style.bg};` : "";
    const fg = style.fg ? `color: ${style.fg};` : "";
    const css = `${bg}${fg}`;
    const msg = '%c' + args.map(arg => typeof arg === 'object' ? '%o' : '%s').join(' ');
    console.log(msg, css, ...args);
  }
  fn.cfg = defaultCfg;
  return fn as ConsooFn;
};
