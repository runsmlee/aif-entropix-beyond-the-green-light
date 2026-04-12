import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HowItWorks } from '../components/HowItWorks';

describe('HowItWorks', () => {
  it('renders the section heading', () => {
    render(<HowItWorks />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('genuine insight');
  });

  it('renders all four step titles', () => {
    render(<HowItWorks />);
    expect(screen.getByText('Connect Your Systems')).toBeInTheDocument();
    expect(screen.getByText('Entropy Analysis Begins')).toBeInTheDocument();
    expect(screen.getByText('Surface Hidden Patterns')).toBeInTheDocument();
    expect(screen.getByText('Act with Confidence')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/Plug in your existing monitoring/)).toBeInTheDocument();
    expect(screen.getByText(/predictive alerts and root cause/)).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    render(<HowItWorks />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('has the correct section id for navigation', () => {
    render(<HowItWorks />);
    const section = screen.getByRole('heading', { level: 2 }).closest('section');
    expect(section).toHaveAttribute('id', 'how-it-works');
  });
});
