export function monitorActiveElement() {
  window.__consoo_state = window.__consoo_state || {};
  if (window.__consoo_state.monitorActiveFlag) return;
  window.__consoo_state.monitorActiveFlag = true;

  let last = document.activeElement;
  window.__consoo_state.monitorActiveTimeoutId = setInterval(() => {
    if (document.activeElement !== last) {
      last = document.activeElement;
      console.log("Focus changed to: ", last);
    }
  }, 100);

  return stopMonitorActiveElement;
}

export function stopMonitorActiveElement() {
  window.__consoo_state = window.__consoo_state || {};
  window.__consoo_state.monitorActiveFlag = false;
  clearInterval(window.__consoo_state.monitorActiveTimeoutId);
}
