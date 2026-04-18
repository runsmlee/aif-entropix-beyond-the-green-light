import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useActiveSection } from '../hooks/useActiveSection';

describe('useActiveSection', () => {
  it('returns null initially when no section is intersecting', () => {
    const { result } = renderHook(() => useActiveSection());
    // With our mock IntersectionObserver that fires isIntersecting: true
    // for document.body (which doesn't match any section id),
    // activeSection should remain null
    expect(result.current).toBeNull();
  });
});
