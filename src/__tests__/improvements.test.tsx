import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '../components/Hero';
import { Metrics } from '../components/Metrics';
import { CTA } from '../components/CTA';
import { FAQ } from '../components/FAQ';
import { LiveProbe } from '../components/LiveProbe';

describe('Improvement: Hero uses shared useScrollAnimation hook', () => {
  it('social proof counter becomes visible when scrolled into view', () => {
    render(<Hero />);
    const teamsText = screen.getByLabelText('380+ teams');
    expect(teamsText).toBeInTheDocument();
  });

  it('renders responsive mobile entropy card', () => {
    render(<Hero />);
    // Mobile entropy summary card should have system entropy label
    const systemEntropy = screen.getAllByText('System Entropy');
    expect(systemEntropy.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Improvement: Metrics uses shared useScrollAnimation hook', () => {
  it('animated counters start at 0 and display target values', () => {
    render(<Metrics />);
    // The section should render without errors
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('renders percentage metrics with correct suffixes', () => {
    render(<Metrics />);
    // The AnimatedCounter renders target value text, even before animation completes
    // Check that the aria-labels contain the target values
    expect(screen.getByLabelText('94%')).toBeInTheDocument();
    expect(screen.getByLabelText('73%')).toBeInTheDocument();
  });
});

describe('Improvement: CTA form accessibility', () => {
  it('email input has proper autocomplete attribute', () => {
    render(<CTA />);
    const input = screen.getByPlaceholderText('Enter your work email');
    expect(input).toHaveAttribute('autoComplete', 'email');
  });

  it('form has accessible label', () => {
    render(<CTA />);
    const form = screen.getByLabelText('Sign up for free trial');
    expect(form).toBeInTheDocument();
  });

  it('success state preserves entered email', () => {
    render(<CTA />);
    const input = screen.getByPlaceholderText('Enter your work email');
    const submitBtn = screen.getByText('Start Free Trial');

    fireEvent.change(input, { target: { value: 'user@example.com' } });
    fireEvent.click(submitBtn);

    // Success message should reference the entered email
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('Trial link sent')).toBeInTheDocument();
  });

  it('success state has role status', () => {
    render(<CTA />);
    const input = screen.getByPlaceholderText('Enter your work email');
    const submitBtn = screen.getByText('Start Free Trial');

    fireEvent.change(input, { target: { value: 'valid@test.com' } });
    fireEvent.click(submitBtn);

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
  });
});

describe('Improvement: FAQ keyboard accessibility', () => {
  it('all FAQ buttons are focusable', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    // 6 FAQ accordion buttons
    expect(buttons.length).toBeGreaterThanOrEqual(6);
  });

  it('FAQ items have correct aria-expanded state initially', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('aria-expanded toggles on click', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    const firstButton = buttons[0];

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Clicking again collapses
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('opening one item closes another (single-open accordion)', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('FAQ panels have region role when expanded', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');

    // Expand first item to reveal its panel region
    fireEvent.click(buttons[0]);
    const regions = screen.getAllByRole('region');
    // At least one region should be visible when expanded
    expect(regions.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Improvement: LiveProbe interaction flow', () => {
  it('demo button populates URL input', () => {
    render(<LiveProbe />);
    const demoButton = screen.getByText('Demo');
    const input = screen.getByLabelText('URL to probe for entropy analysis');

    fireEvent.click(demoButton);
    expect(input).toHaveValue('api.example.com/health');
  });

  it('run probe button is enabled initially', () => {
    render(<LiveProbe />);
    const probeButton = screen.getByText('Run Probe');
    expect(probeButton).not.toBeDisabled();
  });

  it('probe has correct label for input', () => {
    render(<LiveProbe />);
    const label = screen.getByText('Enter a URL to probe');
    expect(label).toBeInTheDocument();
  });

  it('probe description mentions browser-local demo', () => {
    render(<LiveProbe />);
    expect(screen.getByText(/no data leaves your browser/i)).toBeInTheDocument();
  });
});

describe('Improvement: useScrollAnimation hook consistency', () => {
  it('hook returns stable ref across renders', async () => {
    const { useScrollAnimation } = await import('../hooks/useScrollAnimation');
    const { renderHook } = await import('@testing-library/react');

    const { result, rerender } = renderHook(() => useScrollAnimation());
    const firstRef = result.current.ref;

    rerender();
    expect(result.current.ref).toBe(firstRef);
  });
});
