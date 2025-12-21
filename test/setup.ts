import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia for components that use it (like Framer Motion or certain layout hooks)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
global.ResizeObserver = MockResizeObserver;

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(public callback: any, public options: any) {}
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

import React from 'react';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: any) {
    const { fill, ...rest } = props;
    return React.createElement('img', { 
      ...rest, 
      'data-fill': fill ? 'true' : undefined 
    });
  },
}));
