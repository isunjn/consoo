import type { ConsooInstance } from "../core/type";
import { print } from "../core/utils";

export function inspect<T>(this: ConsooInstance, data: T): T;
export function inspect<T>(
  this: ConsooInstance,
  mark: string | number,
  data: T,
): T;
export function inspect<T>(
  this: ConsooInstance,
  markOrData: string | number | T,
  data?: T,
): T {
  const mark = arguments.length === 1 ? "" : (markOrData as string | number);
  data = arguments.length === 1 ? (markOrData as T) : (data as T);

  print(this.cfg, [data], {
    mark,
    style: {
      ["border-radius"]: "99999px",
    },
  });

  return data;
}
