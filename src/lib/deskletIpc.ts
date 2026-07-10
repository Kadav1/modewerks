// Frontend IPC helper for modewerks Cinnamon desklet

export type WindowLayer = 'above' | 'normal' | 'below';

/**
 * Detects whether the app is running in the packaged desklet WebView context.
 * In development (e.g. running under Vite), the protocol is http: or https:.
 * In the packaged desklet, it loads via file://.
 */
export const isDeskletContext = (): boolean => {
  return typeof window !== 'undefined' && window.location.protocol === 'file:';
};

/**
 * Safely wraps window.prompt calls.
 */
const safePrompt = (message: string, defaultValue: string = ''): string | null => {
  if (!isDeskletContext()) {
    return null;
  }
  try {
    return window.prompt(message, defaultValue);
  } catch (error) {
    console.error(`Desklet IPC prompt failed:`, error);
    return null;
  }
};

/**
 * Gets the current window layer from the Python wrapper.
 */
export const getWindowLayer = (): WindowLayer => {
  const layer = safePrompt('GET_LAYER', '');
  if (layer && ['above', 'normal', 'below'].includes(layer)) {
    return layer as WindowLayer;
  }
  return 'below'; // Safe fallback
};

/**
 * Sets the window layer in the Python wrapper.
 */
export const setWindowLayer = (layer: WindowLayer): void => {
  safePrompt(`SET_LAYER:${layer}`, '');
};

/**
 * Triggers native window drag start.
 */
export const startWindowDrag = (): void => {
  safePrompt('DRAG_START', '');
};

/**
 * Triggers native window resize start.
 */
export const startWindowResize = (): void => {
  safePrompt('RESIZE_START', '');
};
