import '@testing-library/jest-dom'
import React from 'react'

// Make React available globally for tests
global.React = React

// Mock HTMLFormElement.prototype.requestSubmit for jsdom
Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', {
  value: function (this: HTMLFormElement) {
    // Create and dispatch a submit event
    const event = new Event('submit', { bubbles: true, cancelable: true })
    this.dispatchEvent(event)
  },
  writable: true,
  configurable: true,
})

// Global test setup
global.console = {
  ...console,
  // Silence console.error in tests unless it's an actual error
  error: jest.fn(),
  warn: jest.fn(),
}

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
