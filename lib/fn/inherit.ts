import { defaultCfg } from "../core";

const log = (...args: any[]) => {
  if (defaultCfg.noop) return;
  console.log(...args);
};

const clear = () => {
  if (defaultCfg.noop) return;
  console.clear();
}

export default {
  log,
  clear,
};
