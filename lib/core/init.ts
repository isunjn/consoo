import type { Config, Consoo, ConsooInstance, InitOption } from "./type";
import { defaultCfg } from "./cfg";

import * as print from "../impl/print";
import * as wrapper from "../impl/wrapper";
import * as helper from "../impl/helper";
import * as monitor from "../impl/monitor";
import * as fancy from "../impl/fancy";

const make = (cfg: Partial<Config> = {}): ConsooInstance => ({
  cfg: {
    ...defaultCfg,
    ...cfg,
  },
  ...print,
  ...wrapper,
  ...helper,
  ...monitor,
  ...fancy,
});

export const init = (option?: InitOption) => {
  const {
    noop = false,
    alias = [],
    defaultLogLevel = "info",
    prefix = "",
    colors,
  } = option || {};

  if (noop) {
    // TODO: make a no-op consoo instance
  }

  defaultCfg.defaultLogLevel = defaultLogLevel;
  defaultCfg.prefix = prefix;
  defaultCfg.colors = colors || defaultCfg.colors;

  const consoo = (mark: string | number) => make({ mark });
  Object.assign(consoo, make());

  const names = Array.isArray(alias) ? alias : [alias];
  ["consoo", ...names].forEach((name) => {
    // @ts-expect-error
    window[name] = window[name] || (consoo as Consoo);
  });
};
