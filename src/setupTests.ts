import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Add Vitest/Jest compatibility shim
(globalThis as unknown as Record<string, unknown>).jest = vi;

// Mock getBoundingClientRect to avoid MUI layout warnings in jsdom
Element.prototype.getBoundingClientRect = () => ({
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: () => {},
});

// Suppress specific MUI anchorEl warning in tests as it is a known jsdom limitation
const suppressMuiWarning = (...args: unknown[]) => {
  const message = args.map((arg) => String(arg)).join(' ');
  if (/MUI: The .*anchorEl.* prop provided to the component is invalid/.test(message)) {
    return true;
  }
  return false;
};

const originalError = console.error;
console.error = (...args: unknown[]) => {
  if (suppressMuiWarning(...args)) return;
  originalError.apply(console, args);
};

const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (suppressMuiWarning(...args)) return;
  originalWarn.apply(console, args);
};
