import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Metrics } from '../components/Metrics';

describe('Metrics', () => {
  it('renders the section heading', () => {
    render(<Metrics />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Measured impact');
  });

  it('renders all metric labels', () => {
    render(<Metrics />);
    expect(screen.getByText('Incidents Prevented')).toBeInTheDocument();
    expect(screen.getByText('Mean Time to Detection')).toBeInTheDocument();
    expect(screen.getByText('False Positives Reduced')).toBeInTheDocument();
    expect(screen.getByText('Teams Deployed')).toBeInTheDocument();
  });

  it('renders metric descriptions', () => {
    render(<Metrics />);
    expect(screen.getByText('Caught before they triggered alerts')).toBeInTheDocument();
    expect(screen.getByText('Faster than traditional monitoring')).toBeInTheDocument();
    expect(screen.getByText('By focusing on entropy, not thresholds')).toBeInTheDocument();
    expect(screen.getByText('Across production environments worldwide')).toBeInTheDocument();
  });

  it('renders live indicators for counter metrics', () => {
    render(<Metrics />);
    const liveIndicators = screen.getAllByText('Live');
    expect(liveIndicators.length).toBeGreaterThanOrEqual(2);
  });

  it('has the correct section id for navigation', () => {
    render(<Metrics />);
    const section = screen.getByRole('heading', { level: 2 }).closest('section');
    expect(section).toHaveAttribute('id', 'metrics');
  });
});
