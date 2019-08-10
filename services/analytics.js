import { isServer } from '@madebyconnor/bamboo-ui';

export function getDataLayer() {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function sendEvent(event) {
  if (isServer) {
    return;
  }
  getDataLayer().push(event);
}
