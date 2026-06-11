import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '../components/Hero';

describe('Hero', () => {
  it('renders the hero heading with sharpened copy', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('API Response Drift Detector');
  });

  it('renders the emotional hook as subheading beneath H1', () => {
    render(<Hero />);
    expect(screen.getByText(/Your Green Dashboard Is/)).toBeInTheDocument();
    // Verify the subheading is a p element (not a heading), to confirm single H1
    const subheading = screen.getByText(/Your Green Dashboard Is/).closest('p');
    expect(subheading).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    const demoButton = screen.getByRole('button', { name: /Try the Demo/i });
    expect(demoButton).toBeInTheDocument();
    const howItWorks = screen.getByText('See How It Works');
    expect(howItWorks).toBeInTheDocument();
  });

  it('renders trust signals', () => {
    render(<Hero />);
    expect(screen.getByText('No credit card required')).toBeInTheDocument();
    expect(screen.getByText('14-day trial')).toBeInTheDocument();
    expect(screen.getByText('Cancel anytime')).toBeInTheDocument();
  });

  it('primary CTA is an interactive button that triggers demo probe', () => {
    render(<Hero />);
    const demoButton = screen.getByRole('button', { name: /Try the Demo/i });
    expect(demoButton).toHaveAttribute('type', 'button');
    fireEvent.click(demoButton);
    // After clicking, the probe should start — check for probing state
    expect(screen.getByText(/Probing demo endpoint/)).toBeInTheDocument();
  });

  it('renders the entropy heat map labels on desktop', () => {
    render(<Hero />);
    expect(screen.getByText('Entropy Heat Map')).toBeInTheDocument();
    expect(screen.getByText('Click to probe')).toBeInTheDocument();
  });

  it('renders the badge with action-oriented text', () => {
    render(<Hero />);
    expect(screen.getByText('Dashboard Lie Detection')).toBeInTheDocument();
  });

  it('renders the analyzing signals indicator', () => {
    render(<Hero />);
    expect(screen.getByText('Analyzing 3 signals')).toBeInTheDocument();
  });

  it('demo probe shows progress bar during probing', () => {
    render(<Hero />);
    const demoButton = screen.getByRole('button', { name: /Try the Demo/i });
    fireEvent.click(demoButton);
    // Progress bar should appear
    const progressBar = screen.getByRole('progressbar', { name: 'Demo probe progress' });
    expect(progressBar).toBeInTheDocument();
  });

  it('renders deterministic trust indicator below value prop', () => {
    render(<Hero />);
    expect(screen.getByText(/deterministic · runs in your browser/)).toBeInTheDocument();
  });

  it('value prop appears before deterministic indicator', () => {
    const { container } = render(<Hero />);
    const valueProp = screen.getByText(/false negative waiting to explode/);
    const deterministic = screen.getByText(/deterministic · runs in your browser/);
    const allParagraphs = Array.from(container.querySelectorAll('p'));
    const valuePropIndex = allParagraphs.indexOf(valueProp.closest('p')!);
    const deterministicIndex = allParagraphs.indexOf(deterministic.closest('p')!);
    expect(valuePropIndex).toBeLessThan(deterministicIndex);
  });
});
