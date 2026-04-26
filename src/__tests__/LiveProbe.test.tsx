import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LiveProbe } from '../components/LiveProbe';

describe('LiveProbe', () => {
  it('renders the section heading', () => {
    render(<LiveProbe />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Try entropy analysis');
  });

  it('renders the URL input field', () => {
    render(<LiveProbe />);
    const input = screen.getByLabelText('URL to probe for entropy analysis');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'api.example.com/health');
  });

  it('renders the Demo button', () => {
    render(<LiveProbe />);
    const demoButton = screen.getByRole('button', { name: 'Demo' });
    expect(demoButton).toBeInTheDocument();
  });

  it('renders the Run Probe button', () => {
    render(<LiveProbe />);
    const probeButton = screen.getByRole('button', { name: 'Run Probe' });
    expect(probeButton).toBeInTheDocument();
  });

  it('renders the demo simulation disclaimer', () => {
    render(<LiveProbe />);
    expect(screen.getByText(/demo simulation/i)).toBeInTheDocument();
  });

  it('renders description text about the demo', () => {
    render(<LiveProbe />);
    expect(screen.getByText(/no data leaves your browser/)).toBeInTheDocument();
  });

  it('has an aria-live region for screen reader announcements', () => {
    render(<LiveProbe />);
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  it('renders the URL label', () => {
    render(<LiveProbe />);
    expect(screen.getByText('Enter a URL to probe')).toBeInTheDocument();
  });
});
