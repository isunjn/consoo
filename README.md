# consoo

A set of helper functions for **_quick and dirty_** frontend debugging.

## Usage

First, install the package:

```sh
npm install -D consoo
# or
pnpm install -D consoo
```

Then, import and initialize:

```js
import { initConsoo } from "consoo";

initConsoo({
  // ... init options
});

consoo.log("foo");
consoo("bar").debug("baz");
// ...
```

If you use typescirpt:

```ts
import { initConsoo, type Consoo } from "consoo";

declare global {
  const so: Consoo;
}

initConsoo({
  alias: "so",
  // ... init options
});

so.log("foo");
so("bar").debug("baz");
// ...
```

Init options and the defaults:

```ts
initConsoo({
  noop: false, // if true, all methods will be no-op
  alias: "consoo", // string | string[], global access names, e.g. "so"
  defaultLogLevel: "info", // "info" | "warn" | "error" | "debug"
  prefix: undefined, // string | undefined, prefix for all messages
  markStyle: {
    padding: "2px",
  }, // mark css style
  markColors: [
    { bg: "#5151db", fg: "#fff" },
    { bg: "#5cc290", fg: "#fff" },
    { bg: "#860418", fg: "#fff" },
    { bg: "#dddddd", fg: "#000" },
    { bg: "#000000", fg: "#fff" },
    { bg: "#555555", fg: "#fff" },
    { bg: "#ff664d", fg: "#fff" },
    { bg: "#d4b475", fg: "#fff" },
    { bg: "#8f5465", fg: "#fff" },
    { bg: "#3fffff", fg: "#000" },
    { bg: "#7f4ac3", fg: "#fff" },
    { bg: "#fc9cff", fg: "#fff" },
  ], // mark color list
});
```

## Helpers

### console wrapper & message mark

- All console methods are also available in `consoo` object:
  `log` `info` `warn` `error` `debug` `trace`
  `dir` `dirxml` `table` `group` `groupCollapsed` `groupEnd`
  `clear` `count` `countReset` `assert` `time` `timeLog` `timeEnd` `timeStamp`
  `profile` `profileEnd`

- `consoo` can be called with a string or number first, which will be printed with a colored background,
  acting as a mark/tag for the following message.

```ts
consoo.log("foo");
consoo("mark").log("foo");
```

### pause after delay

- Pause the script execution after a delay, can be useful when debugging hover-state ui or dom-changing issues.

- You may call it directly in devtools console.

```ts
consoo.pause(3000); // default delay is 0 ms
```

### message separator

- Print a separator line in the console panel.

```ts
consoo.sep("=", 80); // (repeator?: string, len?: number) => void
```

### inspect & trace & monitor

- Inspect (print to console) a variable or expression, return the value as is,
  can be useful when you don't borther to add a separate `console.log` line or re-type all the expression.

```ts
consoo.inspect(foo);
consoo.inspect("mark", foo + bar * baz); // you can add a mark too
```

- Print the call stack and arguments every time the specific function is called.

```ts
let foo = (a, b) => a + b;
foo = consoo.traceFn(foo);
foo(1, 2); // will print the call stack and arguments
```

- Print the call stack every time the specific object property is accessed (get or set).

```ts
consoo.traceProp(obj, "prop");
```

- Monitor the `document.activeElement` change.

```ts
consoo.monitorActiveElement(); // return a function to stop monitoring
consoo.stopMonitorActiveElement(); // or you can stop it directly
```

### vconsole for mobile debugging

- Load and initialize [vConsole](https://github.com/Tencent/vConsole) (A simulated devtool for mobile web page) on the fly, without installing it as a dependency.

```ts
consoo.v(); // (VConsoleInitOption?: { theme: "dark" | "light" }) => void
```
