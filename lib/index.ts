const cfg = {
  noop: false,
};

type InitOption = {
  noop?: boolean;
  alias?: string | string[];
  global?: boolean;
};

const init = (option?: InitOption) => {
  const {
    noop = false,
    alias = [],
    global = true,
  } = option || {};

  if (noop) {
    cfg.noop = true;
  }


  if (global) {
    const aliases = Array.isArray(alias) ? alias : [alias];
    ["consoo", ...aliases].forEach(name => {
      // @ts-expect-error
      window[name] = window[name] || consoo;
    });
  }
};

const log = (...args: any[]) => {
  if (cfg.noop) return;
  console.log(...args);
};

const clear = () => {
  if (cfg.noop) return;
  console.clear();
}

const consoo = {
  init,
  log,
  clear,
};

export type Consoo = typeof consoo;

export default consoo;
