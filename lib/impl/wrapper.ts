export function assert(condition?: boolean, ...data: any[]) {
  console.assert(condition, ...data);
}

export function clear() {
  console.clear();
}

export function count(label?: string) {
  console.count(label);
}

export function countReset(label?: string) {
  console.countReset(label);
}

export function dir(item?: any, options?: any) {
  console.dir(item, options);
}

export function dirxml(...data: any[]) {
  console.dirxml(...data);
}

export function group(...data: any[]) {
  console.group(...data);
}

export function groupCollapsed(...data: any[]) {
  console.groupCollapsed(...data);
}

export function groupEnd() {
  console.groupEnd();
}

export function table(tabularData: any, properties?: string[]) {
  console.table(tabularData, properties);
}

export function time(label?: string) {
  console.time(label);
}

export function timeEnd(label?: string) {
  console.timeEnd(label);
}

export function timeLog(label?: string, ...data: any[]) {
  console.timeLog(label, ...data);
}

export function timeStamp(label?: string) {
  console.timeStamp(label);
}

export function trace(...data: any[]) {
  console.trace(...data);
}

export function profile(label?: string) {
  console.profile(label);
}

export function profileEnd(label?: string) {
  console.profileEnd(label);
}
