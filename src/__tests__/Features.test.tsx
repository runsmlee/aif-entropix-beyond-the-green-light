import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Features } from '../components/Features';

describe('Features', () => {
  it('renders the section heading', () => {
    render(<Features />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('dashboards can\'t');
  });

  it('renders all six feature cards', () => {
    render(<Features />);
    expect(screen.getByText('Entropy Detection')).toBeInTheDocument();
    expect(screen.getByText('Pattern Recognition')).toBeInTheDocument();
    expect(screen.getByText('Predictive Alerts')).toBeInTheDocument();
    expect(screen.getByText('Root Cause Analysis')).toBeInTheDocument();
    expect(screen.getByText('System Visualization')).toBeInTheDocument();
    expect(screen.getByText('Team Collaboration')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<Features />);
    expect(screen.getByText(/Identify hidden disorder/)).toBeInTheDocument();
    expect(screen.getByText(/Surface subtle degradation/)).toBeInTheDocument();
  });
});
