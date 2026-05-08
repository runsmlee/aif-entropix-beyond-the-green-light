import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollPositionOptions {
  /** Threshold in px above which isScrolled becomes true. Default: 10 */
  scrolledThreshold?: number;
}

interface ScrollPosition {
  scrollY: number;
  progress: number;
  isScrolled: boolean;
}

export function useScrollPosition(
  options: UseScrollPositionOptions = {}
): ScrollPosition {
  const { scrolledThreshold = 10 } = options;
  const [position, setPosition] = useState<ScrollPosition>({
    scrollY: 0,
    progress: 0,
    isScrolled: false,
  });
  const rafRef = useRef<number>(0);
  const ticking = useRef(false);

  const updatePosition = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent =
      docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

    setPosition({
      scrollY: scrollTop,
      progress: scrollPercent,
      isScrolled: scrollTop > scrolledThreshold,
    });
    ticking.current = false;
  }, [scrolledThreshold]);

  useEffect(() => {
    function handleScroll(): void {
      if (!ticking.current) {
        ticking.current = true;
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updatePosition]);

  return position;
}
