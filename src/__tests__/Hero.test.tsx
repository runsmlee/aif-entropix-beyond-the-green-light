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

  it('renders the social proof counter', () => {
    render(<Hero />);
    expect(screen.getByText('Joined this month')).toBeInTheDocument();
  });

  it('renders the entropy heat map labels on desktop', () => {
    render(<Hero />);
    expect(screen.getByText('Entropy Heat Map')).toBeInTheDocument();
    expect(screen.getByText('Live simulation')).toBeInTheDocument();
  });

  it('renders the badge with Next-Generation Intelligence text', () => {
    render(<Hero />);
    expect(screen.getByText('Next-Generation Intelligence')).toBeInTheDocument();
  });

  it('renders the analyzing signals indicator', () => {
    render(<Hero />);
    expect(screen.getByText('Analyzing 3 signals')).toBeInTheDocument();
  });
});
