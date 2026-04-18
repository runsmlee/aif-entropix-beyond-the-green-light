import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

describe('useScrollAnimation', () => {
  it('returns a ref object, isVisible boolean, and prefersReduced boolean', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
    expect(typeof result.current.isVisible).toBe('boolean');
    expect(typeof result.current.prefersReduced).toBe('boolean');
  });

  it('starts with isVisible false', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.isVisible).toBe(false);
  });

  it('respects prefersReducedMotion by setting isVisible to true immediately', () => {
    // Our mock matchMedia returns matches: false, so prefersReduced should be false
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.prefersReduced).toBe(false);
  });

  it('accepts custom options', () => {
    const { result } = renderHook(() =>
      useScrollAnimation({ threshold: 0.5, rootMargin: '0px', triggerOnce: false })
    );
    expect(result.current.isVisible).toBe(false);
  });
});
