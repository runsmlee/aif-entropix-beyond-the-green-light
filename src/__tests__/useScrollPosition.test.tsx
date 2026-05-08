import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useScrollPosition', () => {
  let rAFCallbacks: FrameRequestCallback[] = [];

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 800,
      configurable: true,
    });

    // Mock rAF to collect callbacks we can trigger manually
    rAFCallbacks = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rAFCallbacks.push(cb);
      return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /** Fire all pending rAF callbacks */
  function flushRAF(): void {
    const callbacks = [...rAFCallbacks];
    rAFCallbacks = [];
    for (const cb of callbacks) {
      act(() => {
        cb(0);
      });
    }
  }

  it('returns scrollY and progress with correct initial values', async () => {
    const { useScrollPosition } = await import('../hooks/useScrollPosition');
    const { result } = renderHook(() => useScrollPosition());

    expect(result.current.scrollY).toBe(0);
    expect(result.current.progress).toBe(0);
  });

  it('updates scroll position on scroll events', async () => {
    const { useScrollPosition } = await import('../hooks/useScrollPosition');
    const { result } = renderHook(() => useScrollPosition());

    Object.defineProperty(window, 'scrollY', { writable: true, value: 500, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    flushRAF();

    expect(result.current.scrollY).toBe(500);
    expect(result.current.progress).toBeGreaterThan(0);
  });

  it('calculates progress correctly', async () => {
    const { useScrollPosition } = await import('../hooks/useScrollPosition');
    const { result } = renderHook(() => useScrollPosition());

    // Scroll to max (scrollHeight - innerHeight = 1200)
    Object.defineProperty(window, 'scrollY', { writable: true, value: 1200, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    flushRAF();

    expect(result.current.progress).toBe(100);
  });

  it('caps progress at 100', async () => {
    const { useScrollPosition } = await import('../hooks/useScrollPosition');
    const { result } = renderHook(() => useScrollPosition());

    Object.defineProperty(window, 'scrollY', { writable: true, value: 5000, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    flushRAF();

    expect(result.current.progress).toBeLessThanOrEqual(100);
  });

  it('returns isScrolled flag based on threshold', async () => {
    const { useScrollPosition } = await import('../hooks/useScrollPosition');
    const { result } = renderHook(() => useScrollPosition({ scrolledThreshold: 10 }));

    expect(result.current.isScrolled).toBe(false);

    Object.defineProperty(window, 'scrollY', { writable: true, value: 50, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    flushRAF();

    expect(result.current.isScrolled).toBe(true);
  });

  it('cleans up scroll listener on unmount', async () => {
    const { useScrollPosition } = await import('../hooks/useScrollPosition');
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollPosition());

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
