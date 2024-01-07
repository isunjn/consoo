import { init } from "./core";
import inherit from "./fn/inherit";
import color from "./fn/color";

const consoo = {
  init,
  ...inherit,
  ...color,
};

export type Consoo = typeof consoo;
export default consoo;
