import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScrollToTop } from '../components/ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Reset scroll position mock
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('renders the scroll to top button', () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button).toBeInTheDocument();
  });

  it('is hidden when scroll position is at top', () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button.className).toContain('opacity-0');
  });

  it('scrolls to top when clicked', () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
