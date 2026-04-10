import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FAQ } from '../components/FAQ';

describe('FAQ', () => {
  it('renders the section heading', () => {
    render(<FAQ />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Common questions');
  });

  it('renders all FAQ questions', () => {
    render(<FAQ />);
    expect(screen.getByText(/entropy-aware.*monitoring/)).toBeInTheDocument();
    expect(screen.getByText(/setup take/)).toBeInTheDocument();
    expect(screen.getByText(/replace.*current/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /How is this different from anomaly detection/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /14-day trial/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /data secure/ })).toBeInTheDocument();
  });

  it('expands and collapses answers on click', () => {
    render(<FAQ />);
    const firstButton = screen.getByRole('button', { name: /entropy-aware.*monitoring/ });

    // Initially collapsed
    expect(firstButton.getAttribute('aria-expanded')).toBe('false');

    // Click to expand
    fireEvent.click(firstButton);
    expect(firstButton.getAttribute('aria-expanded')).toBe('true');

    // Click again to collapse
    fireEvent.click(firstButton);
    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('only allows one item open at a time', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    const firstButton = buttons[0]!;
    const secondButton = buttons[1]!;

    fireEvent.click(firstButton);
    expect(firstButton.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(secondButton);
    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
    expect(secondButton.getAttribute('aria-expanded')).toBe('true');
  });
});
