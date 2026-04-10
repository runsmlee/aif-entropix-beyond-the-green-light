import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '../components/Hero';

describe('Hero', () => {
  it('renders the hero heading', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Beyond the');
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    const startButton = screen.getByText('Start Free Trial');
    expect(startButton).toBeInTheDocument();
    const howItWorks = screen.getByText('See How It Works');
    expect(howItWorks).toBeInTheDocument();
  });

  it('renders trust signals', () => {
    render(<Hero />);
    expect(screen.getByText('No credit card required')).toBeInTheDocument();
    expect(screen.getByText('14-day trial')).toBeInTheDocument();
    expect(screen.getByText('Cancel anytime')).toBeInTheDocument();
  });
});
