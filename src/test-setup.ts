import '@testing-library/jest-dom';

// Mock IntersectionObserver for jsdom
class MockIntersectionObserver {
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(): void {
    // Simulate element being visible
    this.callback(
      [{ isIntersecting: true, target: document.body } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }

  disconnect(): void {}
  unobserve(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: readonly number[] = [];
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
